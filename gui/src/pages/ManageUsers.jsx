import React, { useState } from "react";
import Navigation from "../components/util/Navigation";
import {
  HomeWrapper,
  ComponentWidget,
  SideWidgetMenu,
  WidgetItem,
  Headline,
} from "../components/util/RestaurantStyledComponents";
import NewUser from "../components/users/NewUser";
import UpdateUsers from "../components/users/UpdateUsers";
import { AppImage } from "../components/util/RestaurantStyledComponents";
import { Icon } from "semantic-ui-react";
import { motion } from "framer-motion";
import { secondVariants } from "../util/animations";

const ManageUsers = () => {
  const [showPage, setShowPage] = useState("newUser");
  const [selected, setSelected] = useState("newUser");

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
            <Headline>Manage Users</Headline>
            <ComponentWidget>
              <SideWidgetMenu>
                <div
                  style={{ marginTop: "5vh", backgroundColor: "#fcfcfc" }}
                ></div>
                <WidgetItem
                  className={selected === "newUser" ? "user-item" : ""}
                  onClick={() => {
                    setShowPage("newUser");
                    setSelected("newUser");
                  }}
                >
                  <Icon name="user plus" color="brown" size="large" /> New user
                </WidgetItem>
                <WidgetItem
                  className={selected === "updateUser" ? "user-item" : ""}
                  onClick={() => {
                    setShowPage("updateUsers");
                    setSelected("updateUser");
                  }}
                >
                  <Icon name="users" color="brown" size="large" /> Update users
                </WidgetItem>
              </SideWidgetMenu>
              {showPage === "newUser" ? (
                <NewUser />
              ) : showPage === "updateUsers" ? (
                <UpdateUsers />
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

export default ManageUsers;
