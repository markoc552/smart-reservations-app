import React from "react";
import { Headline } from "../util/RestaurantStyledComponents";
import { Button, Tab } from "semantic-ui-react";
import MealTab from "./MealTab";

const RestaurantMenu = () => {
  const panes = [
    {
      menuItem: "Appetizers",
      render: () => <MealTab />,
    },
    { menuItem: "Meals", render: () => <MealTab /> },
    { menuItem: "Deserts", render: () => <MealTab /> },
    { menuItem: "Drinks", render: () => <MealTab /> },
  ];

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Headline>Menus</Headline>
        <Button
          color="green"
          basic
          style={{ width: "7vw", margin: "auto 0", height: "4vh" }}
        >
          Upload
        </Button>
      </div>

      <div style={{ margin: "0 2vw" }}>
        <Tab panes={panes} style={{ width: "45vw" }} />
      </div>
    </div>
  );
};

export default RestaurantMenu;
