package restaurant.administrator.controllers;


import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.validation.annotation.*;
import org.springframework.web.bind.annotation.*;
import restaurant.administrator.exceptions.*;
import restaurant.administrator.model.dao.*;
import restaurant.administrator.model.dto.*;
import restaurant.administrator.services.*;

import javax.validation.*;
import javax.validation.constraints.*;
import java.util.*;

import static restaurant.administrator.util.AdministratorConstants.RESTAURANT_CAN_T_BE_NULL;
import static restaurant.administrator.util.AdministratorConstants.RESTAURANT_NAME_CAN_T_BE_NULL;

@RestController
@Validated
@CrossOrigin(origins = "*")
@RequestMapping("/v1/restaurants")
public class RestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    @PostMapping("/createRestaurant")
    public ResponseEntity<Object> createRestaurant(@Valid @NotNull(message = RESTAURANT_CAN_T_BE_NULL) @RequestBody RestaurantDto restaurant) throws RestaurantAlreadyExistsException {
        RestaurantDao result = restaurantService.createRestaurant(restaurant);

        return ResponseEntity.ok(result);
    }

    @PostMapping("/updateRestaurant")
    public ResponseEntity<Object> updateRestaurant(@Valid @NotNull(message = RESTAURANT_CAN_T_BE_NULL) @RequestBody RestaurantDto restaurant) throws RestaurantNotFoundException {
        RestaurantDao result = restaurantService.updateRestaurant(restaurant);

        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/deleteRestaurant")
    public ResponseEntity<Object> deleteRestaurant(@Valid @NotNull(message = RESTAURANT_CAN_T_BE_NULL) @RequestBody RestaurantDto restaurant) throws RestaurantNotFoundException {
        restaurantService.deleteRestaurant(restaurant);

        return ResponseEntity.ok("Restaurant successfully deleted");
    }

    @GetMapping("/getAllRestaurants")
    public ResponseEntity<Object> getRestaurants() {
        List<RestaurantDto> allRestaurants = restaurantService.getAllRestaurants();

        return ResponseEntity.ok(allRestaurants);
    }


    @GetMapping("/getRestaurant")
    public ResponseEntity<Object> getRestaurant(@NotNull(message = RESTAURANT_NAME_CAN_T_BE_NULL) @RequestParam(name = "restaurantName") String restaurantName) throws RestaurantNotFoundException {
        RestaurantDto restaurant = restaurantService.getRestaurantByName(restaurantName);

        return ResponseEntity.ok(restaurant);
    }

    @GetMapping("/getRestaurants")
    public ResponseEntity<Object> getRestaurantsByManager(@NotNull(message = RESTAURANT_NAME_CAN_T_BE_NULL) @RequestParam(name = "manager") String manager) throws RestaurantNotFoundException {
        List<RestaurantDto> restaurants = restaurantService.getRestaurantsByManager(manager);

        return ResponseEntity.ok(restaurants);
    }

    @PostMapping("/addBooking")
    public ResponseEntity<Object> addBooking(@Valid @RequestBody BookingDto bookingDto) {
        BookingDto result = restaurantService.persistBooking(bookingDto);

        return ResponseEntity.ok(result);
    }

    @GetMapping("/getBookings")
    public ResponseEntity<Object> getBookings(@RequestParam("restaurantName") String restaurantName) throws RequestException {
        List<BookingDto> bookingsByRestaurant = restaurantService.getBookingsByRestaurant(restaurantName);

        return ResponseEntity.ok(bookingsByRestaurant);
    }
}
