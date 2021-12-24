import React from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Input, Form, Select } from "semantic-ui-react";
import { StyledLabel } from "../util/RestaurantStyledComponents";
import { Formik } from "formik";
import Axios from "axios";

const roles = [
  { value: "admin", text: "ADMIN" },
  { value: "user", text: "USER" },
];

const UserCredentialsModal = (props) => {
  const changeUserCredentials = (values) => {
    Axios.post(
      `${window.ENVIRONMENT.BACKEND_SERVICE}/v1/user/changePassword`,
      {},
      {
        params: {
          username: values.username,
          password: values.password,
        },
      }
    )
      .then(() => {
        Axios.post(
          `${window.ENVIRONMENT.BACKEND_SERVICE}/v1/user/changeRole`,
          {},
          {
            params: {
              username: values.username,
              role: values.role,
            },
          }
        ).then(() => {
          Axios.get(`${window.ENVIRONMENT.BACKEND_SERVICE}/v1/user/getAllUsers`)
            .then((res) => {
              props.setDataToRender(res.data);
              props.isSubmitting(false);
              props.setShow(false);
            })
            .catch((err) => console.log(err));
        });
      })
      .catch((err) => console.log(err));
  };

  const renderForm = () => {
    return (
      <Formik
        initialValues={{
          username: props.selectedRow.username,
          password: props.selectedRow.password,
          role: props.selectedRow.role,
        }}
        onSubmit={async (values, { setSubmitting }) => {
          props.isSubmitting(true);
          setTimeout(() => {
            changeUserCredentials(values, props);
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
          /* and other goodies */
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
            <StyledLabel>Username</StyledLabel>
            <Input
              style={{ margin: "10px 0" }}
              name="username"
              placeholder="Username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
              disabled
            />
            <StyledLabel>Password</StyledLabel>
            <Input
              style={{ margin: "10px 0" }}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            <StyledLabel>Role</StyledLabel>
            <Select
              placeholder="Select role"
              name="role"
              onChange={(value) =>
                setFieldValue("role", value.target.innerText)
              }
              onBlur={handleBlur}
              options={roles}
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
        <Modal.Title>Update user credentials</Modal.Title>
      </Modal.Header>
      <Modal.Body>{renderForm()}</Modal.Body>
    </Modal>
  );
};

export default UserCredentialsModal;
