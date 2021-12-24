import React, { useState } from "react";
import { Button, Input, Tab, TextArea } from "semantic-ui-react";
import ImageUploading from "react-images-uploading";

const MealTab = () => {
  const [mealOneImages, setMealOneImages] = useState([]);
  const [mealTwoImages, setMealTwoImages] = useState([]);
  const [mealThreeImages, setMealThreeImages] = useState([]);
  const maxNumber = 70;

  const onChange = (imageList, addUpdateIndex, mealOrder) => {
    switch (mealOrder) {
      case 1: {
        setMealOneImages(imageList);
        break;
      }
      case 2: {
        setMealTwoImages(imageList);
        break;
      }
      case 3: {
        setMealThreeImages(imageList);
        break;
      }
      default:
        break;
    }
  };

  const renderImageUploader = (mealImages) => {
    return (
      <div
        style={{
          width: "15vw",
          height: "55vh",
          margin: "0 0.5vw",
          border: "1px solid black",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ margin: "0 auto" }}>
            <ImageUploading
              multiple
              value={mealImages}
              onChange={(imageList, addUpdateIndex) =>
                onChange(imageList, addUpdateIndex, 2)
              }
              maxNumber={maxNumber}
              dataURLKey="data_url"
            >
              {({
                imageList,
                onImageUpload,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                <div className="upload__image-wrapper">
                  <Button
                    color="blue"
                    disabled={mealImages.length !== 0}
                    style={
                      isDragging ? { color: "red" } : { margin: "2vh auto" }
                    }
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    Select photo
                  </Button>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      margin: "2vh 0",
                    }}
                  >
                    {imageList.map((image, index) => (
                      <div style={{ display: "flex", margin: "0 auto" }}>
                        <div
                          key={index}
                          className="image-item"
                          style={{
                            marginTop: "2vh",
                            margin: "0 auto",
                          }}
                        >
                          <img
                            src={image["data_url"]}
                            alt=""
                            width="100"
                            style={{ margin: "2vh 0.5vw" }}
                          />
                          <div
                            className="image-item__btn-wrapper"
                            style={{ bottom: 0, position: "relative" }}
                          >
                            <Button
                              color="blue"
                              style={{ margin: "0 0.5vw" }}
                              basic
                              onClick={() => onImageRemove(index)}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </ImageUploading>
          </div>
        </div>
        <Input placeholder="Name" style={{ margin: "0 auto" }} />
        <TextArea
          placeholder="Enter describtion..."
          style={{ margin: "1vh 0.1vw", height: "30vh" }}
        />
      </div>
    );
  };

  return (
    <Tab.Pane style={{ display: "flex", flexDirection: "row" }}>
      {renderImageUploader(mealOneImages)}
      {renderImageUploader(mealTwoImages)}
      {renderImageUploader(mealThreeImages)}
    </Tab.Pane>
  );
};

export default MealTab;
