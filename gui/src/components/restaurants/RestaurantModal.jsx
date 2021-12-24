import React from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Input, Form } from "semantic-ui-react";
import { StyledLabel } from "../util/RestaurantStyledComponents";
import { Formik } from "formik";
import Axios from "axios";
import { useSelector } from "react-redux";

const RestaurantModal = (props) => {
  const token = useSelector((state) => state.auth.token);

  const renderForm = () => {
    return (
      <Formik
        initialValues={{
          name: props.selectedRow.name,
          address: props.selectedRow.address,
        }}
        onSubmit={async (values, { setSubmitting }) => {
          props.isSubmitting(true);

          setTimeout(() => {
            Axios.post(
              `${window.ENVIRONMENT.BACKEND_SERVICE}/v1/restaurant/updateRestaurant`,
              { ...values },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
              .then(() => {
                Axios.get(
                  `${window.ENVIRONMENT.BACKEND_SERVICE}/v1/restaurant/getAllRestaurants`,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                )
                  .then((res) => {
                    props.setDataToRender(res.data);
                    props.isSubmitting(false);
                    props.setShow(false);
                  })
                  .catch((err) => console.log(err));
              })
              .catch((err) => console.log(err));
          }, 3000);
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
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
            <StyledLabel>Name</StyledLabel>
            <Input
              style={{ margin: "10px 0" }}
              name="name"
              placeholder="Name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              disabled
            />
            <StyledLabel>Address</StyledLabel>
            <Input
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
              loading={props.submitting}
            >
              Update
            </Button>
          </Form>
        )}
      </Formik>
    );
  };

  return (
    <Modal
      show={props.show}
      onHide={() => props.setShow(false)}
      dialogClassName="modal-35w"
    >
      <Modal.Header closeButton>
        <Modal.Title>Update restaurant</Modal.Title>
      </Modal.Header>
      <Modal.Body>{renderForm()}</Modal.Body>
    </Modal>
  );
};

export default RestaurantModal;
