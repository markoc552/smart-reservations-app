import React, { useState } from "react";
import Navigation from "../components/util/Navigation";
import {
  HomeWrapper,
  ComponentWidget,
  SideWidgetMenu,
  WidgetItem,
  Headline,
} from "../components/util/RestaurantStyledComponents";
import NewRestaurant from "../components/restaurants/NewRestaurant";
import UpdateRestaurants from "../components/restaurants/UpdateRestaurants";
import RestaurantMenu from "../components/restaurants/RestaurantMenu";
import { AppImage } from "../components/util/RestaurantStyledComponents";
import { Icon } from "semantic-ui-react";
import { motion } from "framer-motion";
import { secondVariants } from "../util/animations";

const ManageRestaurants = () => {
  const [showPage, setShowPage] = useState("newRestaurant");
  const [selected, setSelected] = useState("newRestaurant");

  return (
    <AppImage style={{ height: "100vh" }}>
      <HomeWrapper>
        <Navigation />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={secondVariants}
          style={{ margin: "auto auto" }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Headline>Manage Restaurants</Headline>
            <ComponentWidget>
              <SideWidgetMenu>
                <div
                  style={{ marginTop: "5vh", backgroundColor: "#fcfcfc" }}
                ></div>
                <WidgetItem
                  className={selected === "newRestaurant" ? "user-item" : ""}
                  onClick={() => {
                    setShowPage("newRestaurant");
                    setSelected("newRestaurant");
                  }}
                >
                  <Icon name="plus" color="brown" size="large" /> New
                </WidgetItem>
                <WidgetItem
                  className={selected === "updateRestaurant" ? "user-item" : ""}
                  onClick={() => {
                    setShowPage("updateRestaurants");
                    setSelected("updateRestaurant");
                  }}
                >
                  <Icon name="sitemap" color="brown" size="large" /> Update
                </WidgetItem>
              </SideWidgetMenu>
              {showPage === "newRestaurant" ? (
                <NewRestaurant />
              ) : showPage === "updateRestaurants" ? (
                <UpdateRestaurants />
              ) : showPage === "menus" ? (
                <RestaurantMenu />
              ) : (
                <div>Invalid</div>
              )}
            </ComponentWidget>
          </div>
        </motion.div>
      </HomeWrapper>
    </AppImage>
  );
};

export default ManageRestaurants;
