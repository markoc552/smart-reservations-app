package restaurant.administrator.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.*;
import restaurant.administrator.model.dao.*;

import java.util.*;


@Component
public interface RestaurantRepository extends JpaRepository<RestaurantDao, Long> {

    Optional<RestaurantDao> findByName(String name);

    List<RestaurantDao> findByManager(String name);

    @Override
    List<RestaurantDao> findAll();
}
