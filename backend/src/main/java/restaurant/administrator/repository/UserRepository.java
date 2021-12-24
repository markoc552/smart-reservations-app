package restaurant.administrator.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.*;
import org.springframework.transaction.annotation.*;
import restaurant.administrator.model.dao.*;

import java.util.*;


@Component
public interface UserRepository extends JpaRepository<UserDao, Long> {

    Optional<UserDao> findByUsername(String username);

    Optional<UserDao> findByEmail(String email);

    @Override
    List<UserDao> findAll();
}
