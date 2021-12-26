import React, { useState } from "react";
import {
  DetailsWrapper,
  DetailsItem,
  DetailsItemWrapper,
  DetailsTextWrapper,
  DetailsImageWrapper,
} from "../util/RestaurantStyledComponents";
import { Icon, Image } from "semantic-ui-react";

const details = [
  {
    text: "Explore hundreds of exciting new places available only on our app!",
    imageUri:
      "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=100",
  },
  {
    text: "Always available 24/7",
    imageUri:
      "https://images.unsplash.com/photo-1587476353394-d031d13188ff?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8MjQlMkY3fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=100",
  },
  {
    text: "Explore new restaurants directly from your home",
    imageUri:
      "https://images.unsplash.com/photo-1599619351208-3e6c839d6828?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=100",
  },
  {
    text: "Our app is compatible with every mobile phone screen!",
    imageUri:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=100",
  },
];

const Details = () => {
  const [currentDetail, updateCurrentDetail] = useState("location");

  const getDetailsWrapper = (index) => (
    <>
      <DetailsTextWrapper>{details[index].text}</DetailsTextWrapper>
      <DetailsImageWrapper>
        <Image
          style={{ height: "40vh", width: "40vw" }}
          src={details[index].imageUri}
        />
      </DetailsImageWrapper>
    </>
  );

  const renderSelectedDetail = () => {
    switch (currentDetail) {
      case "location": {
        return getDetailsWrapper(0);
      }
      case "time": {
        return getDetailsWrapper(1);
      }
      case "bed": {
        return getDetailsWrapper(2);
      }
      case "mobile": {
        return getDetailsWrapper(3);
      }
      default:
        return null;
    }
  };

  return (
    <DetailsWrapper>
      <DetailsItemWrapper>
        <DetailsItem onClick={() => updateCurrentDetail("location")}>
          <Icon
            name="location arrow"
            size="large"
            style={{ margin: "auto auto" }}
          />
        </DetailsItem>
        <DetailsItem onClick={() => updateCurrentDetail("time")}>
          <Icon name="clock" size="large" style={{ margin: "auto auto" }} />
        </DetailsItem>
        <DetailsItem onClick={() => updateCurrentDetail("bed")}>
          <Icon name="bed" size="large" style={{ margin: "auto auto" }} />
        </DetailsItem>
        <DetailsItem onClick={() => updateCurrentDetail("mobile")}>
          <Icon
            name="mobile alternate"
            size="large"
            style={{ margin: "auto auto" }}
          />
        </DetailsItem>
      </DetailsItemWrapper>
      {renderSelectedDetail()}
    </DetailsWrapper>
  );
};

export default Details;
