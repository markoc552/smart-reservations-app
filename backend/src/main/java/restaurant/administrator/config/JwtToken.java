package restaurant.administrator.config;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.*;
import restaurant.administrator.aspects.Log;
import restaurant.administrator.exceptions.*;

import java.io.*;
import java.util.*;


@Component
public class JwtToken implements Serializable {

    @Autowired
    private ApplicationProperties applicationProperties;

    @Log
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();

        return Jwts.builder().setClaims(claims)
                             .setSubject(userDetails.getUsername())
                             .setIssuedAt(new Date(System.currentTimeMillis()))
                             .setExpiration(new Date(System.currentTimeMillis() + Long.parseLong(applicationProperties.getTokenExpiration())))
                             .signWith(SignatureAlgorithm.HS256, applicationProperties.getJwtSecret())
                             .compact();
    }

    @Log
    public boolean validateToken(String token, UserDetails userDetails) {
        String secret = applicationProperties.getJwtSecret();

        Claims claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();

        String username = claims.getSubject();

        Date expiration = claims.getExpiration();

        if (expiration.before(new Date()))
            return false;

        return userDetails.getUsername().equals(username);
    }

    @Log
    public String getUsernameFromToken(String token) throws JwtAuthenticationException {
        String secret = applicationProperties.getJwtSecret();

        Claims claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();

        String username = claims.getSubject();

        if (username == null)
            throw new JwtAuthenticationException("Username from token is null!");

        return username;
    }

    @Log
    public UsernamePasswordAuthenticationToken getUserPasswordAuthToken(UserDetails userDetails) {
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }
}
