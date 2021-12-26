import React, { useState, useEffect } from "react";
import Navigation from "../components/home/Navigation";
import {
  HomeWrapper,
  AppImage,
  StyledText,
} from "../components/util/RestaurantStyledComponents";
import { Icon, Button, Item } from "semantic-ui-react";
import Axios from "axios";
import { useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import MenuTemplate from "../components/restaurants/MenuTemplate";
import Bottom from "../components/home/Bottom";

const UpdateMenu = (props) => {
  const [restaurant, setRestaurant] = useState({});

  const [loading, setLoading] = useState(false);

  const token = useSelector((state) => state.auth.token);

  const [request, setRequest] = useState({
    appetizer: [],
    mainMeal: [],
    dessert: [],
    drinks: [],
  });

  const { addToast } = useToasts();

  useEffect(() => {
    Axios.get(
      `${window.ENVIRONMENT.BACKEND_SERVICE}/v1/restaurants/getRestaurant`,
      {
        params: {
          restaurantName: `${props.match.params.restaurant}`,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((res) => {
      setRestaurant(res.data);
    });
  }, []);

  const updateRequest = (meal, mealName) => {
    switch (mealName) {
      case "appetizer": {
        request.appetizer.push(meal);
        break;
      }
      case "mainMeal": {
        request.mainMeal.push(meal);
        break;
      }
      case "dessert": {
        request.dessert.push(meal);
        break;
      }
      case "drinks": {
        request.drinks.push(meal);
        break;
      }
      default:
        break;
    }
  };

  const createMenu = () => {
    Axios.post(
      `${window.ENVIRONMENT.BACKEND_SERVICE}/v1/menu/createMenu`,
      { ...request, restaurant: restaurant.name },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then(() => {
        setLoading(false);
        addToast("Menu added successfully!", {
          appearance: "success",
        });
      })
      .catch(() => {
        setLoading(false);
        addToast("Error while adding menu!", {
          appearance: "error",
        });
      });
  };

  return (
    <AppImage
      style={{
        backgroundImage: "none",
      }}
    >
      <HomeWrapper>
        <Navigation />
        <Item
          style={{ margin: "2vh auto", display: "flex", flexDirection: "row" }}
        >
          <Item.Image
            size="small"
            src="https://hvar-gariful.hr/wp-content/themes/gariful-20/img/showcase/aboutFull1.jpg"
          />

          <Item.Content style={{ margin: "2vh 1vw" }}>
            <StyledText>{restaurant.name}</StyledText>
            <StyledText>{restaurant.address}</StyledText>
            <StyledText>{restaurant.manager}</StyledText>
          </Item.Content>
        </Item>
        <Button
          color="green"
          loading={loading}
          onClick={() => {
            setRequest({ ...request, restaurant: restaurant.name });
            setLoading(true);
            createMenu();
          }}
        >
          <Icon name="upload" />
          Update
        </Button>
        <MenuTemplate
          updateRequest={updateRequest}
          mealName="appetizer"
          meal={{
            name: "Appetizers",
          }}
        />
        <MenuTemplate
          updateRequest={updateRequest}
          mealName="mainMeal"
          meal={{
            name: "Main meal",
          }}
        />
        <MenuTemplate
          updateRequest={updateRequest}
          mealName="dessert"
          meal={{
            name: "Desert",
          }}
        />
        <MenuTemplate
          updateRequest={updateRequest}
          mealName="drinks"
          meal={{
            name: "Drinks",
          }}
        />
        <Bottom />
      </HomeWrapper>
    </AppImage>
  );
};

export default UpdateMenu;
