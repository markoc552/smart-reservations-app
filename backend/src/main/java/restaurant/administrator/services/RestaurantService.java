package restaurant.administrator.services;


import org.modelmapper.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import restaurant.administrator.aspects.*;
import restaurant.administrator.exceptions.*;
import restaurant.administrator.model.dao.*;
import restaurant.administrator.model.dto.*;
import restaurant.administrator.repository.*;

import java.util.*;
import java.util.stream.Collectors;

import static restaurant.administrator.util.AdministratorConstants.*;

@Service
public class RestaurantService {

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private BookingsRepository bookingsRepository;

    @Autowired
    private ModelMapper mapper;

    @Log
    public RestaurantDao createRestaurant(RestaurantDto restaurantDto) throws RestaurantAlreadyExistsException {
        String restaurantName = restaurantDto.getName();

        Optional<RestaurantDao> byName = restaurantRepository.findByName(restaurantName);

        if (byName.isPresent())
            throw new RestaurantAlreadyExistsException(RESTAURANT_ALREADY_EXISTS);

        return persistRestaurant(restaurantDto, new RestaurantDao(), restaurantName);
    }

    @Log
    public RestaurantDao updateRestaurant(RestaurantDto restaurantDto) throws RestaurantNotFoundException {
        String restaurantName = restaurantDto.getName();

        Optional<RestaurantDao> byName = restaurantRepository.findByName(restaurantName);

        if (byName.isPresent()) {
            RestaurantDao restaurantDao = byName.get();

            return persistRestaurant(restaurantDto, restaurantDao, restaurantName);
        } else {
            throw new RestaurantNotFoundException(RESTAURANT_NOT_EXISTS);
        }
    }

    public void deleteRestaurant(RestaurantDto restaurantDto) throws RestaurantNotFoundException {
        Optional<RestaurantDao> byName = restaurantRepository.findByName(restaurantDto.getName());

        if (byName.isPresent()) {
            RestaurantDao restaurantDao = byName.get();

            restaurantRepository.delete(restaurantDao);
        } else {
            throw new RestaurantNotFoundException(RESTAURANT_NOT_EXISTS);
        }
    }

    @Log
    public RestaurantDto getRestaurantByName(String restaurantName) throws RestaurantNotFoundException {
        Optional<RestaurantDao> byName = restaurantRepository.findByName(restaurantName);

        if (byName.isPresent()) {
            RestaurantDto restaurantDto = mapper.map(byName.get(), RestaurantDto.class);

            restaurantDto.setMainImage(getRestaurantMainImage(restaurantName));

            return restaurantDto;
        } else {
            throw new RestaurantNotFoundException();
        }
    }

    @Log
    public List<RestaurantDto> getAllRestaurants() {
        List<RestaurantDao> allRestaurants = restaurantRepository.findAll();

        return allRestaurants.stream()
                             .map(this::getRestaurantDto)
                             .collect(Collectors.toList());
    }

    @Log
    public List<RestaurantDto> getRestaurantsByManager(String manager) {
        List<RestaurantDao> allManagerRestaurants = restaurantRepository.findByManager(manager);

        return allManagerRestaurants.stream()
                                    .map(this::getRestaurantDto)
                                    .collect(Collectors.toList());
    }

    @Log
    public BookingDto persistBooking(BookingDto bookingDto) {
        BookingDao dao = mapper.map(bookingDto, BookingDao.class);

        bookingsRepository.save(dao);

        return bookingDto;
    }

    @Log
    public List<BookingDto> getBookingsByRestaurant(String restaurantName) {
        List<BookingDao> restaurantBookings = bookingsRepository.findByRestaurant(restaurantName);

        return restaurantBookings.stream()
                                 .map(bookingDao -> mapper.map(bookingDao, BookingDto.class))
                                 .collect(Collectors.toList());
    }

    private RestaurantDao persistRestaurant(RestaurantDto restaurantDto, RestaurantDao restaurantDao, String restaurantName) {
        restaurantDao.setName(restaurantDto.getName());
        restaurantDao.setAddress(restaurantDto.getAddress());
        restaurantDao.setManager(restaurantDto.getManager());
        restaurantDao.setOpenClosed(restaurantDto.getOpenClosed());
        restaurantDao.setAvailableTables(restaurantDto.getAvailableTables());

        restaurantDto.getImages().forEach(image -> persistImage(restaurantName, image));

        return restaurantRepository.save(restaurantDao);
    }

    private void persistImage(String restaurantName, String image) {
        ImageDao imageDao = new ImageDao();
        imageDao.setRestaurant(restaurantName);
        imageDao.setData(image.getBytes());

        imageRepository.save(imageDao);
    }

    private String getRestaurantMainImage(String restaurantName) {
        List<ImageDao> allImages = imageRepository.findByRestaurant(restaurantName);

        return new String(allImages.get(0).getData());
    }

    private List<String> getAlRestaurantImages(String restaurantName) {
        List<ImageDao> allImages = imageRepository.findByRestaurant(restaurantName);

        return allImages.stream()
                        .map(imageDao -> new String(imageDao.getData()))
                        .collect(Collectors.toList());
    }

    private RestaurantDto getRestaurantDto(RestaurantDao restaurantDao) {
        RestaurantDto restaurantDto = new RestaurantDto();

        restaurantDto.setAddress(restaurantDao.getAddress());
        restaurantDto.setManager(restaurantDao.getManager());
        restaurantDto.setName(restaurantDao.getName());
        restaurantDto.setOpenClosed(restaurantDao.getOpenClosed());
        restaurantDto.setAvailableTables(restaurantDao.getAvailableTables());
        restaurantDto.setImages(getAlRestaurantImages(restaurantDao.getName()));

        return restaurantDto;
    }
}
