package restaurant.administrator.controllers;


import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.validation.annotation.*;
import org.springframework.web.bind.annotation.*;
import restaurant.administrator.exceptions.*;
import restaurant.administrator.model.*;
import restaurant.administrator.model.dao.*;
import restaurant.administrator.model.dto.*;
import restaurant.administrator.services.*;
import restaurant.administrator.util.*;

import javax.validation.*;
import javax.validation.constraints.*;
import java.util.*;

import static restaurant.administrator.util.AdministratorConstants.*;

@RestController
@Validated
@CrossOrigin(origins = "*")
@RequestMapping("/v1/menu")
public class MenuController {

    @Autowired
    private MenuService menuService;

    @PostMapping("/createMenu")
    public ResponseEntity<Object> createMenu(@Valid @NotNull(message = USER_CAN_T_BE_NULL) @RequestBody MenuDto menuDto) {
        MenuDto result = menuService.addMenu(menuDto);

        return ResponseEntity.ok(result);
    }

    @GetMapping("/getMenu")
    public ResponseEntity<Object> getMenu(@NotNull @RequestParam("restaurantName") String restaurantName) throws MenuNotFoundException {
        MenuDto menuByRestaurant = menuService.getMenuByRestaurant(restaurantName);

        return ResponseEntity.ok(menuByRestaurant);
    }
}
