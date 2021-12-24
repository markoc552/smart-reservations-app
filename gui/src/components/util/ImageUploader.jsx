import React, { useState } from "react";
import ImageUploading from "react-images-uploading";
import { Button } from "semantic-ui-react";

const ImageUploader = (props) => {
  const [profile, setProfile] = useState(null);
  const maxNumber = 1;

  const onChange = (imageList) => {
    props.addToRequest(imageList[0].data_url);
    setProfile(imageList);
  };

  return (
    <ImageUploading
      multiple
      value={profile}
      onChange={onChange}
      maxNumber={maxNumber}
      dataURLKey="data_url"
    >
      {({ imageList, onImageUpload, onImageRemove, isDragging, dragProps }) => (
        // write your building UI
        <div
          className="upload__image-wrapper"
          style={{ display: "flex", flexDirection: "column" }}
        >
          {profile === null && (
            <Button
              basic
              color="blue"
              style={isDragging ? { color: "red" } : { margin: "0 auto" }}
              onClick={onImageUpload}
              {...dragProps}
            >
              Select picture
            </Button>
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              margin: "0.5vh 0.7vw",
            }}
          >
            {imageList.map((image, index) => (
              <div style={{ position: "relative" }}>
                <div key={index} className="image-item">
                  <img src={image["data_url"]} alt="" width="100" />
                  <div
                    className="image-item__btn-wrapper"
                    style={{ display: "flex" }}
                  >
                    <Button
                      color="blue"
                      style={{ margin: "0.5vh auto" }}
                      basic
                      onClick={() => {
                        onImageRemove(index);
                        setProfile(null);
                      }}
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
  );
};

export default ImageUploader;
