package restaurant.administrator.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.*;
import restaurant.administrator.model.dao.*;

import java.util.*;


@Component
public interface UserCredentialsRepository extends JpaRepository<UserCredentialsDao, Long> {

    Optional<UserCredentialsDao> findByUsername(String username);
}
