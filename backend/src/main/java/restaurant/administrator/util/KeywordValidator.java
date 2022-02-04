package restaurant.administrator.util;

import restaurant.administrator.aspects.Log;

import javax.validation.*;
import java.util.regex.*;

public class KeywordValidator implements ConstraintValidator<Keyword, String> {

    @Log
    public boolean isValid(String value, ConstraintValidatorContext constraintValidatorContext) {
        Pattern pattern = Pattern.compile("[A-Z]");

        Matcher matcher = pattern.matcher(value);

        return matcher.matches();
    }
}
