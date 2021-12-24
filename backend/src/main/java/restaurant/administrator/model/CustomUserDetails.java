package restaurant.administrator.model;

import lombok.*;
import org.springframework.security.core.*;
import org.springframework.security.core.authority.*;
import org.springframework.security.core.userdetails.*;
import restaurant.administrator.model.dao.*;

import java.util.*;

@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CustomUserDetails implements UserDetails {

    private Collection<? extends GrantedAuthority> authorities;

    private String email;

    private String displayName;

    private String password;

    private String username;

    private boolean enabled;

    private boolean accountNonExpired;

    private boolean accountNonLocked;

    private boolean credentialsNonExpired;

    private UserDao user;

    public CustomUserDetails(UserDao userDao) {
        this.user = userDao;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities()
    {
        String role = user.getCredentials().getRole();
        List<SimpleGrantedAuthority> grantedAuthorities = new ArrayList<>();

        grantedAuthorities.add(new SimpleGrantedAuthority(role));

        return grantedAuthorities;
    }

    public String getEmail() {
        return user.getEmail();
    }

    public String getDisplayName() {
        return displayName;
    }

    @Override
    public String getPassword() {
        return user.getCredentials().getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    public UserDao getUser() {
        return user;
    }
}
