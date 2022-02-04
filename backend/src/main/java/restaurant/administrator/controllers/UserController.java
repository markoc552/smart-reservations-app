package restaurant.administrator.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import restaurant.administrator.aspects.Log;
import restaurant.administrator.exceptions.UserAlreadyExistsException;
import restaurant.administrator.exceptions.UserNotFoundException;
import restaurant.administrator.model.CustomUserDetails;
import restaurant.administrator.model.dao.RestaurantDao;
import restaurant.administrator.model.dao.UserCredentialsDao;
import restaurant.administrator.model.dao.UserDao;
import restaurant.administrator.model.dto.UserDto;
import restaurant.administrator.services.UserService;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;

import static restaurant.administrator.util.AdministratorConstants.*;

@RestController
@Validated
@CrossOrigin(origins = "*")
@RequestMapping("/v1/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Log
    @PostMapping("/createUser")
    public ResponseEntity<Object> createUser(@Valid @NotNull(message = USER_CAN_T_BE_NULL) @RequestBody UserDto userDto) throws UserAlreadyExistsException {
        UserDao userDao = userService.createUser(userDto);

        return ResponseEntity.ok(userDao);
    }

    @Log
    @PostMapping("/updateUser")
    public ResponseEntity<Object> updateUser(@Valid @NotNull(message = USER_CAN_T_BE_NULL) @RequestBody UserDto userDto) throws UserNotFoundException {
        UserDao userDao = userService.updateUser(userDto);

        return ResponseEntity.ok(userDao);
    }

    @Log
    @DeleteMapping("/deleteUser")
    public ResponseEntity<Object> deleteUser(@Valid @NotNull(message = USER_CAN_T_BE_NULL) @RequestBody UserDto userDto) throws UserNotFoundException {
        userService.deleteUser(userDto);

        return ResponseEntity.ok("User successfully deleted");
    }

    @Log
    @GetMapping("/getUser")
    public ResponseEntity<Object> getUser(@NotNull(message = USER_CAN_T_BE_NULL) @RequestParam(name = "username") String username) throws UserNotFoundException {
        UserDao user = userService.getUserByUsername(username);

        CustomUserDetails userDetails = new CustomUserDetails(user);

        return ResponseEntity.ok(userDetails);
    }

    @Log
    @GetMapping("/getUserData")
    public ResponseEntity<Object> getUserData(@NotNull(message = USER_CAN_T_BE_NULL) @RequestParam(name = "username") String username) throws UserNotFoundException {
        UserDto userData = userService.getUserData(username);

        return ResponseEntity.ok(userData);
    }

    @Log
    @GetMapping("/getAllUsers")
    public ResponseEntity<Object> getAllUsers() {
        List<UserDto> allUsers = userService.getAllUsers();

        return ResponseEntity.ok().body(allUsers);
    }

    @Log
    @GetMapping("/getUserCredentials")
    public ResponseEntity<Object> getUserCredentials(@NotNull(message = USERNAME_CAN_T_BE_NULL) @RequestParam(name = "username") String username) throws UserNotFoundException {
        UserCredentialsDao credentials = userService.getCredentialsByUsername(username);

        return ResponseEntity.ok(credentials);
    }

    @Log
    @GetMapping("/getAllProjectsByUser/{username}")
    public ResponseEntity<Object> getProjectsByUser(@NotNull @PathVariable("username") String username) throws UserNotFoundException {
        List<RestaurantDao> allProjects = userService.getProjectsByUser(username);

        return ResponseEntity.ok(allProjects);
    }

    @Log
    @PostMapping("/changePassword")
    public ResponseEntity<Object> changePassword(@NotNull(message = USERNAME_CAN_T_BE_NULL) @RequestParam(name = "password") String password,
                                                 @NotNull(message = USERNAME_CAN_T_BE_NULL) @RequestParam(name = "username") String username ) throws UserNotFoundException {
        userService.changePassword(username, password);

        return ResponseEntity.ok("User password successfully changed!");
    }

    @Log
    @PostMapping("/changeRole")
    public ResponseEntity<Object> changeRole(@NotNull(message = USER_CAN_T_BE_NULL) @RequestParam(name = "username") String username,
                                             @NotNull(message = ROLE_CAN_T_BE_NULL) @RequestParam(name = "role") String role) throws UserNotFoundException {
        UserCredentialsDao credentials = userService.changeRole(username, role);

        return ResponseEntity.ok(credentials);
    }
}
