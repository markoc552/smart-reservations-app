import React from "react";
import Navigation from "../components/home/Navigation";
import {
  HomeWrapper,
  AppImage,
  Headline,
  StyledProfileLabel,
} from "../components/util/RestaurantStyledComponents";
import { Icon, Image, Button, Message } from "semantic-ui-react";
import history from "../history";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { secondVariants } from "../util/animations";


const UserProfile = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <AppImage style={{ height: "100vh" }}>
      <HomeWrapper>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={secondVariants}
          style={{ margin: "auto auto" }}
        >
          <Navigation />
          <Headline>My profile</Headline>
          {user !== undefined && (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ padding: "50px", margin: "0 30px" }}>
                <Image
                  src={user.profilePhoto}
                  size="mini"
                  avatar
                  style={{ width: "80px", height: "80px", margin: "15px 20px" }}
                />
                <div>
                  <StyledProfileLabel>
                    <Icon name="user" />
                    Username
                  </StyledProfileLabel>
                  <StyledProfileLabel
                    style={{ fontWeight: "100", fontSize: "14px" }}
                  >
                    {user.username}
                  </StyledProfileLabel>
                </div>
                <div>
                  <StyledProfileLabel>
                    <Icon name="user" />
                    Firstname
                  </StyledProfileLabel>
                  <StyledProfileLabel
                    style={{ fontWeight: "100", fontSize: "14px" }}
                  >
                    {user.firstname}
                  </StyledProfileLabel>
                </div>
                <div>
                  <StyledProfileLabel>
                    <Icon name="user" />
                    Lastname
                  </StyledProfileLabel>
                  <StyledProfileLabel
                    style={{ fontWeight: "100", fontSize: "14px" }}
                  >
                    {user.lastname}
                  </StyledProfileLabel>
                </div>
                <div>
                  <StyledProfileLabel>
                    <Icon name="at" />
                    Email
                  </StyledProfileLabel>
                  <StyledProfileLabel
                    style={{ fontWeight: "100", fontSize: "14px" }}
                  >
                    {user.email}
                  </StyledProfileLabel>
                </div>
              </div>
              <Message
                color="brown"
                style={{
                  width: "25vw",
                  height: "20vh",
                  marginLeft: "10vw",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Message.Header>Info</Message.Header>
                <p
                  style={{
                    fontSize: "15px",
                    margin: "auto auto",
                    color: "#253858",
                  }}
                >
                  This page shows your profile info. You can if you want change
                  that in Update profile section
                </p>
                <Button
                  style={{ margin: "0 auto" }}
                  color="brown"
                  onClick={() => history.push("/updateProfile")}
                >
                  Update
                </Button>
              </Message>
            </div>
          )}
        </motion.div>
      </HomeWrapper>
    </AppImage>
  );
};

export default UserProfile;
