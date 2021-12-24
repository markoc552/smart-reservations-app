package restaurant.administrator.controllers;


import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import restaurant.administrator.exceptions.*;

import javax.validation.*;

@ControllerAdvice
public class ControllerExceptionHandler {

    @ExceptionHandler(value = { UserNotFoundException.class,
                                UserAlreadyExistsException.class,
                                RestaurantAlreadyExistsException.class,
                                RestaurantNotFoundException.class })
    protected ResponseEntity<Object> handleUserException(Exception ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    protected ResponseEntity<Object> handleConstraintViolationException(ConstraintViolationException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }
}
