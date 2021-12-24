import React, { useState } from "react";
import {
  HeadlineWrapper,
} from "../util/RestaurantStyledComponents";
import { Button, Item, Input, TextArea } from "semantic-ui-react";
import ImageUploader from "../util/ImageUploader";

const MenuTemplate = (props) => {
    const [firstMeal, updateFirstMeal] = useState({});
    const [secondMeal, updateSecondMeal] = useState({});
    const [thirdMeal, updateThirdMeal] = useState({});
    const [finalized, setFinalized] = useState(false);
  
    return (
      <div style={{ margin: "0 2vw" }}>
        <HeadlineWrapper
          style={{ color: "black", fontSize: "20px", margin: "2vh 1vw" }}
        >
          {props.meal.name}
        </HeadlineWrapper>
        <Item.Group divided>
          <Item>
            <ImageUploader
              addToRequest={(image) => {
                updateFirstMeal({ ...firstMeal, image });
              }}
            />
            <Item.Content style={{ margin: "0 4vw" }}>
              <Item.Header as="a">
                <Input
                  placeholder="Enter name..."
                  onChange={(e) => {
                    updateFirstMeal({ ...firstMeal, name: e.target.value });
                  }}
                />
              </Item.Header>
              <Item.Meta>
                <span className="cinema">
                  <Input
                    placeholder="Enter taste..."
                    onChange={(e) => {
                      updateFirstMeal({ ...firstMeal, taste: e.target.value });
                    }}
                  />
                </span>
              </Item.Meta>
              <Item.Description></Item.Description>
              <Item.Extra>
                <TextArea
                  placeholder="Enter details..."
                  onChange={(e) => {
                    updateFirstMeal({
                      ...firstMeal,
                      description: e.target.value,
                    });
                  }}
                />
              </Item.Extra>
            </Item.Content>
          </Item>
  
          <Item>
            <ImageUploader
              addToRequest={(image) => {
                updateSecondMeal({ ...secondMeal, image });
              }}
            />
            <Item.Content style={{ margin: "0 4vw" }}>
              <Item.Header as="a">
                <Input
                  placeholder="Enter name..."
                  onChange={(e) => {
                    updateSecondMeal({ ...secondMeal, name: e.target.value });
                  }}
                />
              </Item.Header>
              <Item.Meta>
                <span className="cinema">
                  <Input
                    placeholder="Enter taste..."
                    onChange={(e) => {
                      updateSecondMeal({ ...secondMeal, taste: e.target.value });
                    }}
                  />
                </span>
              </Item.Meta>
              <Item.Description></Item.Description>
              <Item.Extra>
                <TextArea
                  placeholder="Enter details..."
                  onChange={(e) => {
                    updateSecondMeal({
                      ...secondMeal,
                      description: e.target.value,
                    });
                  }}
                />
              </Item.Extra>
            </Item.Content>
          </Item>
  
          <Item>
            <ImageUploader
              addToRequest={(image) => {
                updateThirdMeal({ ...thirdMeal, image });
              }}
            />
            <Item.Content style={{ margin: "0 4vw" }}>
              <Item.Header as="a">
                <Input
                  placeholder="Enter name..."
                  onChange={(e) => {
                    updateThirdMeal({ ...thirdMeal, name: e.target.value });
                  }}
                />
              </Item.Header>
              <Item.Meta>
                <span className="cinema">
                  <Input
                    placeholder="Enter taste..."
                    onChange={(e) => {
                      updateThirdMeal({ ...thirdMeal, taste: e.target.value });
                    }}
                  />
                </span>
              </Item.Meta>
              <Item.Description></Item.Description>
              <Item.Extra>
                <TextArea
                  placeholder="Enter details..."
                  onChange={(e) => {
                    updateThirdMeal({
                      ...thirdMeal,
                      description: e.target.value,
                    });
                  }}
                />
              </Item.Extra>
            </Item.Content>
          </Item>
          <Button
            fluid
            disabled={finalized}
            color="orange"
            onClick={() => {
              props.updateRequest(secondMeal, props.mealName, secondMeal.name);
              props.updateRequest(firstMeal, props.mealName, firstMeal.name);
              props.updateRequest(thirdMeal, props.mealName, thirdMeal.name);
              setFinalized(true);
            }}
          >
            Finalize meal
          </Button>
        </Item.Group>
      </div>
    );
  };

  export default MenuTemplate