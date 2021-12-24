package restaurant.administrator.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.*;
import org.springframework.transaction.annotation.*;
import restaurant.administrator.model.dao.*;

import java.util.*;


@Component
@Transactional
public interface BookingsRepository extends JpaRepository<BookingDao, Long> {

    List<BookingDao> findByRestaurant(String restaurant);
}
