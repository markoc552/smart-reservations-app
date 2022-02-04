package restaurant.administrator.controllers;



import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.*;
import org.springframework.web.bind.annotation.*;
import restaurant.administrator.aspects.Log;
import restaurant.administrator.config.*;
import restaurant.administrator.model.dto.*;
import restaurant.administrator.services.*;

import javax.validation.*;
import javax.validation.constraints.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/v1/jwt")
public class JwtAuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtToken jwtToken;

    @Log
    @PostMapping("/authenticate")
    public ResponseEntity<Object> generateJwtToken(@Valid @NotNull(message = "Jwt request can't be null!") @RequestBody JwtRequest jwtRequest) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(jwtRequest.getUsername(), jwtRequest.getPassword()));

        UserDetails userDetails = userService.loadUserByUsername(jwtRequest.getUsername());

        String token = jwtToken.generateToken(userDetails);

        return ResponseEntity.ok(new JwtResponse(token));
    }
}
