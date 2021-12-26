import React, { useState, useEffect } from "react";
import Navigation from "../components/home/Navigation";
import {
  HomeWrapper,
  AppImage,
  HeadlineWrapper,
  StyledText,
} from "../components/util/RestaurantStyledComponents";
import { Image, Button, Item, Popup } from "semantic-ui-react";
import Logo from "../assets/images/logo.png";
import { useSelector } from "react-redux";
import Axios from "axios";
import Spinner from "react-bootstrap/Spinner";

const MenuTemplate = ({ course }) => {
  return (
    <div style={{ margin: "0 2vw" }}>
      <HeadlineWrapper
        style={{ color: "black", fontSize: "20px", margin: "2vh 1vw" }}
      >
        {course.name}
      </HeadlineWrapper>
      <Item.Group divided>
        {course.meals.map((course) => (
          <Item>
            <Item.Image src={course.image} />

            <Item.Content>
              <Item.Header as="a">{course.name}</Item.Header>
              <Item.Meta>
                <span className="cinema">{course.taste}</span>
              </Item.Meta>
              <Item.Description></Item.Description>
              <Item.Extra>
                <Popup
                  content={course.details}
                  position="right center"
                  on="click"
                  pinned
                  trigger={<Button content="See details" color="red" />}
                />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </div>
  );
};

const MainMenu = (props) => {
  const [dataToRender, setDataToRender] = useState();
  const [restaurant, setRestaurant] = useState();

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    getDataToRender("/v1/menus/getMenu", setDataToRender);
    getDataToRender("/v1/restaurants", setRestaurant);
  }, []);

  const getDataToRender = (path, setStateCallback) => {
    Axios.get(`${window.ENVIRONMENT.BACKEND_SERVICE}${path}`, {
      params: {
        restaurantName: `${props.match.params.restaurant}`,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      setStateCallback(res.data);
    });
  };

  function renderRestaurantInfo() {
    return <Item
      style={{
        margin: "2vh auto",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Item.Image
        size="small"
        src="https://hvar-gariful.hr/wp-content/themes/gariful-20/img/showcase/aboutFull1.jpg" />

      <Item.Content style={{ margin: "2vh 1vw" }}>
        <StyledText>{restaurant.name}</StyledText>
        <StyledText>{restaurant.address}</StyledText>
        <StyledText>{restaurant.manager}</StyledText>
      </Item.Content>
    </Item>;
  }

  function renderBottom() {
    return <div
      style={{
        boxShadow: "0px 7px 13px 5px rgba(0, 0, 0, 0.17)",
        marginTop: dataToRender === undefined ? "90vh" : "0",
        height: "5vh",
        width: "70vw",
        display: "flex",
      }}
    >
      <div style={{ margin: "auto auto" }}>
        <Image avatar src={Logo} /> Smart Reservation App ltd.
      </div>
    </div>;
  }

  return (
    <AppImage
      style={{
        backgroundImage: "none",
        height: dataToRender === undefined && "100vh",
      }}
    >
      <HomeWrapper
        style={{
          height: dataToRender === undefined && "100vh",
        }}
      >
        <Navigation />
        {restaurant === undefined || dataToRender === undefined ? (
          <div style={{ margin: "50vh auto" }}>
            <Spinner animation="border" size="lg" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <>
            {renderRestaurantInfo()}
            <MenuTemplate
              course={{
                name: "Appetizers",
                meals: dataToRender.appetizer,
              }}
            />
            <MenuTemplate
              course={{
                name: "Main meals",
                meals: dataToRender.mainMeal,
              }}
            />
            <MenuTemplate
              course={{
                name: "Desserts",
                meals: dataToRender.dessert,
              }}
            />
            <MenuTemplate
              course={{
                name: "Drinks",
                meals: dataToRender.drinks,
              }}
            />
          </>
        )}
        {renderBottom()}
      </HomeWrapper>
    </AppImage>
  );
};

export default MainMenu;
