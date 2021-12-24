package restaurant.administrator.aspects;


import lombok.*;
import org.apache.logging.log4j.*;
import org.aspectj.lang.*;
import org.aspectj.lang.annotation.*;
import org.aspectj.lang.reflect.*;
import org.springframework.stereotype.*;

import java.lang.annotation.*;
import java.lang.reflect.*;
import java.util.*;

@Aspect
@Component
public class LoggingAspect {

    private Logger logger;
    private ProceedingJoinPoint jp;
    private StringBuilder builder;

    public LoggingAspect() {
        builder = new StringBuilder();
    }

    @SneakyThrows
    @Around("@annotation(log) && execution(* *.*(..))")
    public Object aroundLog(ProceedingJoinPoint joinPoint, Log log) throws Throwable {

        logger = LogManager.getLogger(log.loggerName());
        jp = joinPoint;

        Object result = null;

        try
        {
            if (Level.INFO.equals(logger.getLevel()))
                result = logInfo();

            else if (Level.DEBUG.equals(logger.getLevel()))
                result = logDebug();

        } catch (Throwable ex) {

            logger.error("Error in method {}() -> {}",jp.getSignature().getName(), ex.getMessage());

            if (log.rethrowException())
                throw ex;
        }

        return result;
    }

    private Object logDebug() throws Throwable {

        builder.append(String.format("Entering method %s", jp.getSignature().getName()))
                .append("with arguments ");

        appendParameters(builder);

        logger.debug(builder);

        builder.delete(0, builder.length());

        Object result = jp.proceed();

        builder.append(String.format("Exiting method %s()", jp.getSignature().getName()))
                .append(String.format("%n With result %s", result));

        logger.debug(builder);

        builder.delete(0, builder.length());

        return result;
    }

    private Object logInfo() throws Throwable {

        builder.append(String.format("Entering method %s()", jp.getSignature().getName()));

        logger.info(builder);

        builder.delete(0, builder.length());

        Object result = jp.proceed();

        Class returnType = ((MethodSignature) jp.getSignature()).getReturnType();

        builder.append(String.format("Exiting method %s()", jp.getSignature().getName()));

        System.out.println(returnType.getTypeName());

        if (!returnType.getTypeName().equalsIgnoreCase("void"))
            builder.append(String.format(" with result %s", result.toString()));

        logger.info(builder);

        builder.delete(0, builder.length());

        return result;
    }

    private void appendParameters(StringBuilder builder) {

        Method method = ((MethodSignature) jp.getSignature()).getMethod();

        Parameter[] parameters = method.getParameters();

        Object[] args = jp.getArgs();

        for (int i = 0; i < parameters.length; i++) {

            Parameter param = parameters[i];

            Annotation[] annotations = param.getAnnotations();

            boolean ignore = Arrays.stream(annotations).anyMatch(annotation -> annotation instanceof LogIgnore);

            builder.append(param.getName()).append(" -> value = ");

            if (ignore)
                builder.append("****");

            else if (args[i].getClass().isAnnotation())
                builder.append("Array: ").append(args[i].getClass().getSimpleName());

            else if (args[i] == null)
                builder.append("null");

            else
                builder.append(args[i].toString());
        }
    }
}
