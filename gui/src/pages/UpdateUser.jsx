import React from "react";
import Navigation from "../components/home/Navigation";
import {
  HomeWrapper,
  AppImage,
} from "../components/util/RestaurantStyledComponents";
import UpdateUserProfile from "../components/users/UpdateProfilePage";
import Bottom from "../components/home/Bottom";

const UpdateUser = () => {
  return (
    <AppImage
      style={{
        backgroundImage: "none",
      }}
    >
      <HomeWrapper style={{ height: "100vh" }}>
        <Navigation />
        <UpdateUserProfile />
        <Bottom />
      </HomeWrapper>
    </AppImage>
  );
};

export default UpdateUser;
