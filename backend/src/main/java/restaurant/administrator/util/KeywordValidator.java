package restaurant.administrator.util;

import javax.validation.*;
import java.util.regex.*;

public class KeywordValidator implements ConstraintValidator<Keyword, String> {

    public boolean isValid(String value, ConstraintValidatorContext constraintValidatorContext) {

        Pattern pattern = Pattern.compile("[A-Z]");

        Matcher matcher = pattern.matcher(value);

        return matcher.matches();
    }
}
