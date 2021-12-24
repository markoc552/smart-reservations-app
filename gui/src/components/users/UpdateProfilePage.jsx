import React, { useState } from "react";
import { Headline } from "../util/RestaurantStyledComponents";
import { Button, Form, Message } from "semantic-ui-react";
import { Formik } from "formik";
import { useSelector, connect } from "react-redux";
import Axios from "axios";
import { login } from "../../redux/actions";

const UpdateProfilePage = (props) => {
  const [submitting, isSubmitting] = useState(false);
  const [success, isSuccess] = useState(false);

  const user = useSelector((state) => state.auth.user);

  const token = useSelector((state) => state.auth.token);

  const updateUser = (values, setSubmitting) => {
    Axios.post(
      `${window.ENVIRONMENT.BACKEND_SERVICE}/v1/user/updateUser`,
      values,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        isSuccess(true);
        setSubmitting(false);
        isSubmitting(false);
        props.login(true, values);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <Headline>Update profile</Headline>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ padding: "50px" }}>
          <Formik
            initialValues={{
              username: user.username,
              firstname: user.firstname,
              password: user.password,
              lastname: user.lastname,
              email: user.email,
            }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              isSubmitting(true);

              updateUser(values, setSubmitting);
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
                  disabled
                  style={{ margin: "10px 0" }}
                  name="username"
                  placeholder="Username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <input
                  style={{ margin: "10px 0" }}
                  name="firstname"
                  placeholder="Firstname"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstname}
                />
                <input
                  style={{ margin: "10px 0" }}
                  name="lastname"
                  placeholder="Lastname"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastname}
                />
                <input
                  style={{ margin: "10px 0" }}
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <Button
                  type="submit"
                  color="brown"
                  style={{ marginTop: "25px" }}
                  disabled={submitting}
                >
                  Update
                </Button>
              </Form>
            )}
          </Formik>
        </div>
        {success && (
          <Message color="green" style={{ width: "25vw", height: "10vh" }}>
            <Message.Header>Successfull</Message.Header>
            <p
              style={{ fontSize: "15px", marginTop: "10px", color: "#253858" }}
            >
              Profile has been successfully updated!
            </p>
          </Message>
        )}
      </div>
    </div>
  );
};

export default connect(null, { login })(UpdateProfilePage);
