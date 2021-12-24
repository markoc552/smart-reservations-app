package restaurant.administrator.aspects;


import java.lang.annotation.*;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface Log {

    boolean rethrowException() default true;

    String loggerName() default "";
}
