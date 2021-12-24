package restaurant.administrator.exceptions;

public class JwtAuthenticationException extends Exception {

    public JwtAuthenticationException() {
        super();
    }

    public JwtAuthenticationException(String message) {
        super(message);
    }
}
