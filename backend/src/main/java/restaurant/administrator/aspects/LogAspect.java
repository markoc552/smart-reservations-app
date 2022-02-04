package restaurant.administrator.aspects;


import lombok.SneakyThrows;
import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

import java.lang.annotation.Annotation;
import java.lang.reflect.Method;
import java.lang.reflect.Parameter;
import java.util.Arrays;

@Aspect
@Component
public class LogAspect {

    private Logger logger;
    private ProceedingJoinPoint jp;
    private final StringBuilder builder;

    public LogAspect() {
        builder = new StringBuilder();
    }

    @SneakyThrows
    @Around("@annotation(log) && execution(* *.*(..))")
    public Object logAround(ProceedingJoinPoint joinPoint, Log log) {
        logger = LogManager.getLogger(log.loggerName());
        jp = joinPoint;

        Object result = null;
        try {
            result = logProperLevel();
        } catch (Throwable ex) {
            logger.error("Error in method {}() -> {}", jp.getSignature().getName(), ex.getMessage());
            if (log.rethrowException()) throw ex;
        }

        return result;
    }

    private Object logProperLevel() throws Throwable {
        Object result = null;

        if (Level.INFO.equals(logger.getLevel()))
            result = logInfo();
        else if (Level.DEBUG.equals(logger.getLevel()))
            result = logDebug();

        return result;
    }

    private Object logDebug() throws Throwable {
        appendMethodEnter(jp.getSignature().getName(), true);

        logger.debug(builder);
        builder.delete(0, builder.length());

        Object result = appendMethodExit(jp.getSignature().getName(), true);

        logger.debug(builder);
        builder.delete(0, builder.length());

        return result;
    }

    private Object logInfo() throws Throwable {
        appendMethodEnter(jp.getSignature().getName());

        logger.info(builder);
        builder.delete(0, builder.length());

        Object result = appendMethodExit(jp.getSignature().getName(), hasResult());

        logger.info(builder);
        builder.delete(0, builder.length());

        return result;
    }

    private void appendParameters(StringBuilder builder) {
        Parameter[] parameters = getParameters();
        Object[] args = jp.getArgs();

        for (int i = 0; i < parameters.length; i++) {
            Parameter param = parameters[i];
            Annotation[] annotations = param.getAnnotations();

            builder.append(param.getName()).append(" -> value = ");

            if (isIgnore(annotations))
                builder.append("____");
            else if (args[i] == null)
                builder.append("null");
            else if (args[i].getClass().isAnnotation())
                builder.append("Array: ").append(args[i].getClass().getSimpleName());
            else
                builder.append(args[i].toString());
        }
    }

    private boolean isIgnore(Annotation[] annotations) {
        return Arrays.stream(annotations).anyMatch(LogIgnore.class::isInstance);
    }

    private Parameter[] getParameters() {
        Method method = ((MethodSignature) jp.getSignature()).getMethod();

        return method.getParameters();
    }

    private void appendMethodEnter(String methodName) {
        appendMethodEnter(methodName, false);
    }

    private void appendMethodEnter(String methodName, boolean hasParameters) {
        builder.append(String.format("Entering method %s()", methodName));

        if(hasParameters) {
            builder.append("with arguments ");
            appendParameters(builder);
        }
    }

    private Object appendMethodExit(String methodName, boolean hasResult) throws Throwable {
        builder.append(String.format("Exiting method %s()", methodName));

        Object result = jp.proceed();

        if(hasResult) {
            builder.append(String.format("%n with result %s", result));
        }

        return result;
    }

    private boolean hasResult() {
        Class returnType = ((MethodSignature) jp.getSignature()).getReturnType();

        return !returnType.getTypeName().equalsIgnoreCase("void");
    }
}
