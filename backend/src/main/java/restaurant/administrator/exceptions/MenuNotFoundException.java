package restaurant.administrator.exceptions;

public class MenuNotFoundException extends Exception {

    public MenuNotFoundException() {
        super();
    }

    public MenuNotFoundException(String message) {
        super(message);
    }
}
