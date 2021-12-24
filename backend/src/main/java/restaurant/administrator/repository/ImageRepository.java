package restaurant.administrator.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.*;
import org.springframework.transaction.annotation.*;
import restaurant.administrator.model.dao.*;

import java.util.*;


@Component
@Transactional
public interface ImageRepository extends JpaRepository<ImageDao, Long> {

    Optional<ImageDao> findByData(String name);

    List<ImageDao> findByRestaurant(String restaurant);

    Optional<ImageDao> findByOwner(String username);
}
