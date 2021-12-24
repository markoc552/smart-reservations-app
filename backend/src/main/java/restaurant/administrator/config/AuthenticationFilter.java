package restaurant.administrator.config;

import lombok.*;
import org.springframework.security.core.*;
import org.springframework.security.web.authentication.*;
import org.springframework.security.web.util.matcher.*;

import javax.servlet.http.*;

public class AuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    public AuthenticationFilter() {
        super.setRequiresAuthenticationRequestMatcher(new AntPathRequestMatcher("/v1/jwt/authenticate", "POST"));
    }

    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {
        return super.attemptAuthentication(request, response);
    }
}
