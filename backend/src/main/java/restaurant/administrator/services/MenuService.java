package restaurant.administrator.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import restaurant.administrator.aspects.Log;
import restaurant.administrator.model.dao.MenuDao;
import restaurant.administrator.model.dto.Menu;
import restaurant.administrator.model.dto.MenuDto;
import restaurant.administrator.repository.MenuRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MenuService {

    @Autowired
    private MenuRepository menuRepository;

    private String restaurantName;

    @Log
    @Transactional
    public MenuDto addMenu(MenuDto menuDto) {
        restaurantName = menuDto.getRestaurant();

        persistMenu(menuDto.getAppetizer(), "Appetizer");
        persistMenu(menuDto.getMainMeal(), "Main meal");
        persistMenu(menuDto.getDessert(), "Dessert");
        persistMenu(menuDto.getDrinks(), "Drinks");

        return menuDto;
    }

    @Log
    public MenuDto getMenuByRestaurant(String restaurant) {
        List<MenuDao> allMenus = menuRepository.findByRestaurant(restaurant);

        List<Menu> appetizers = getMenuList(allMenus, "Appetizer");
        List<Menu> mainMeals = getMenuList(allMenus, "Main meal");
        List<Menu> desserts = getMenuList(allMenus, "Desserts");
        List<Menu> drinks = getMenuList(allMenus, "Drinks");

        return new MenuDto(restaurant, appetizers, mainMeals, desserts, drinks);
    }

    private List<Menu> getMenuList(List<MenuDao> byRestaurant, String meal) {
        return byRestaurant.stream().filter(menuDao -> menuDao.getMeal().equals(meal))
                                    .map(this::getMenuDto)
                                    .collect(Collectors.toList());
    }

    private Menu getMenuDto(MenuDao menuDao) {
        Menu menu = new Menu();

        menu.setName(menuDao.getName());
        menu.setDescription(menuDao.getDescription());
        menu.setImage(new String(menuDao.getImage()));
        menu.setTaste(menuDao.getTaste());

        return menu;
    }

    private void persistMenu(List<Menu> menuList, String meal) {
        menuList.forEach(menu -> {
            MenuDao menuDao = new MenuDao();

            menuDao.setMeal(meal);
            menuDao.setName(menu.getName());
            menuDao.setTaste(menu.getTaste());
            menuDao.setRestaurant(restaurantName);
            menuDao.setImage(menu.getImage().getBytes());
            menuDao.setDescription(menu.getDescription());

            menuRepository.save(menuDao);
        });
    }
}
