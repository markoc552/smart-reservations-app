package restaurant.administrator.util;

import javax.validation.*;
import java.lang.annotation.*;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Target({ FIELD })
@Retention(RUNTIME)
@Constraint(validatedBy = KeywordValidator.class)
@Documented
public @interface Keyword {
    String message() default "Keyword must have only uppercase characters!";

    Class<?>[] groups() default { };

    Class<? extends Payload>[] payload() default { };
}
