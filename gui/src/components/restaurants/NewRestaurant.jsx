import React, { useState } from "react";
import {
  Headline,
  FormikWrapper,
  ComponentSideWidgetMenu,
} from "../util/RestaurantStyledComponents";
import { Button, Form } from "semantic-ui-react";
import { Formik } from "formik";
import Axios from "axios";
import ImageUploading from "react-images-uploading";
import { useToasts } from "react-toast-notifications";
import { useSelector } from "react-redux";

const NewRestaurant = () => {
  const [submitting, isSubmitting] = useState(false);
  const [images, setImages] = useState([]);
  const [imageRender, setImageRender] = useState([]);
  const maxNumber = 69;

  const onChange = async (imageList) => {
    console.log(imageList);
    setImageRender(imageList);

    let imagesData = [];

    await Promise.all(
      imageList.map((image) => {
        console.log(images);
        imagesData.push(image.data_url);
      })
    );

    setImages(imagesData);
    console.log(imagesData);
  };

  const user = useSelector((state) => state.auth.user);

  const token = useSelector((state) => state.auth.token);

  const { addToast } = useToasts();

  const createRestaurant = (values, setSubmitting) => {
    Axios.post(
      `${window.ENVIRONMENT.BACKEND_SERVICE}/v1/restaurants/createRestaurant`,
      {
        ...values,
        manager: `${user.firstname} ${user.lastname}`,
        images,
        openClosed: "Closed",
        availableTables: 0,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        addToast("Restaurant created!", {
          appearance: "success",
        });

        setSubmitting(false);
        isSubmitting(false);
      })
      .catch((err) =>
        addToast("Creation error!", {
          appearance: "error",
        })
      );
  };

  const renderForm = () => {
    return (
      <FormikWrapper style={{ padding: "50px" }}>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values, { setSubmitting }) => {
            isSubmitting(true);

            setTimeout(() => {
              createRestaurant(values, setSubmitting);
            }, 2000);
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form
              style={{
                width: "17vw",
                margin: "5vh auto",
                display: "flex",
                flexDirection: "column",
              }}
              onSubmit={handleSubmit}
              size="large"
            >
              <input
                style={{ margin: "10px 0" }}
                name="name"
                placeholder="Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              <input
                style={{ margin: "10px 0" }}
                name="address"
                placeholder="Address"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address}
              />
              <Button
                type="submit"
                color="brown"
                style={{ marginTop: "25px" }}
                disabled={isSubmitting}
                loading={submitting}
              >
                Add
              </Button>
            </Form>
          )}
        </Formik>
      </FormikWrapper>
    );
  };

  const renderImageUploader = () => {
    return (
      <ImageUploading
        multiple
        value={imageRender}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <Button
              color="brown"
              style={isDragging ? { color: "red" } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </Button>
            &nbsp;
            <Button onClick={onImageRemoveAll}>Remove all images</Button>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                margin: "2vh 0",
              }}
            >
              {imageList.map((image, index) => (
                <div style={{ position: "relative" }}>
                  <div
                    key={index}
                    className="image-item"
                    style={{ position: "relative", marginTop: "2vh" }}
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
                        color="brown"
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
    );
  };

  return (
    <ComponentSideWidgetMenu>
      <Headline>Add new restaurant</Headline>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ margin: "0 auto" }}>{renderImageUploader()}</div>
        <Headline
          style={{
            padding: "0",
            fontSize: "17px",
            margin: "2vh auto",
            marginBottom: "-5vh",
          }}
        >
          {images.lenght !== 0
            ? `${imageRender.length} images choosen`
            : "Choose 5 images"}
        </Headline>
        {renderForm()}
      </div>
    </ComponentSideWidgetMenu>
  );
};

export default NewRestaurant;
