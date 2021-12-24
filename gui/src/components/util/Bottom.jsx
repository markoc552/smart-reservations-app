import React from "react";
import { DetailsWrapper } from "./RestaurantStyledComponents";
import Logo from "../../assets/images/logo.png";
import { Icon, Image } from "semantic-ui-react";

const Bottom = () => {
  return (
    <DetailsWrapper
      style={{
        backgroundColor: "#523e33",
        marginBottom: "0",
        display: "flex",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "auto auto",
        }}
      >
        <Image src={Logo} />
        <div>
          <div style={{ fontFamily: "'Arvo', serif", color: "white" }}>
            <Icon name="copyright outline" inverted />
            Smart Restaurant App ltd.
          </div>
        </div>
      </div>
    </DetailsWrapper>
  );
};

export default Bottom;
