package restaurant.administrator.config;

import org.springframework.boot.web.servlet.*;
import org.springframework.context.annotation.*;
import org.springframework.core.*;
import org.springframework.web.cors.*;
import org.springframework.web.filter.*;

import java.util.*;

@Configuration
public class CorsConfiguration {

	@Bean
	FilterRegistrationBean<CorsFilter> filterFilterRegistrationBean() {
		org.springframework.web.cors.CorsConfiguration configuration = new org.springframework.web.cors.CorsConfiguration();

		configuration.setAllowedOrigins(Collections.singletonList("*"));
		configuration.setAllowedHeaders(Collections.singletonList("*"));
		configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "HEAD", "OPTIONS"));

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

		source.registerCorsConfiguration("/**", configuration);

		FilterRegistrationBean<CorsFilter> bean = new FilterRegistrationBean<>();

		bean.setFilter(new CorsFilter(source));
		bean.setOrder(Ordered.HIGHEST_PRECEDENCE);

		return bean;
	}
}
