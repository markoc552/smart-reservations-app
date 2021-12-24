package restaurant.administrator.exceptions;

public class RestaurantAlreadyExistsException extends Exception {

    public RestaurantAlreadyExistsException() {
        super();
    }

    public RestaurantAlreadyExistsException(String message) {
        super(message);
    }
}
