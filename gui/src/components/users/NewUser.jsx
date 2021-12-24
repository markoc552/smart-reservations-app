import React, { useState } from "react";
import { Headline, FormikWrapper, ComponentSideWidgetMenu } from "../util/RestaurantStyledComponents";
import { Button, Form } from "semantic-ui-react";
import { Formik } from "formik";
import Axios from "axios";
import { useToasts } from "react-toast-notifications";

const NewUser = () => {
  const [submitting, isSubmitting] = useState(false);

  const { addToast } = useToasts();

  const createUser = (values, setSubmitting) => {
    isSubmitting(true);

    Axios.post(`${window.ENVIRONMENT.BACKEND_SERVICE}/v1/user/createUser`, {
      ...values,
      role: "USER",
    })
      .then(() => {
        setSubmitting(false);
        isSubmitting(false);
        addToast("User created!", {
          appearance: "success",
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <ComponentSideWidgetMenu>
      <Headline>Add new user</Headline>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <FormikWrapper style={{ padding: "50px" }}>
          <Formik
            initialValues={{ email: "", password: "" }}
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
              setTimeout(() => {
                createUser(values, setSubmitting);
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
                  disabled={isSubmitting}
                  loading={submitting}
                >
                  Add
                </Button>
              </Form>
            )}
          </Formik>
        </FormikWrapper>
      </div>
    </ComponentSideWidgetMenu>
  );
};

export default NewUser;
