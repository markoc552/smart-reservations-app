import React, { useState } from "react";
import {
  RegisterLoginWrapper,
  WelcomeWidgetHello,
} from "../util/RestaurantStyledComponents";
import { Button, Form, Image } from "semantic-ui-react";
import { Formik } from "formik";
import { saveToken, login } from "../../redux/actions";
import Spinner from "react-bootstrap/Spinner";
import { useToasts } from "react-toast-notifications";
import axios from "axios";
import { connect } from "react-redux";
import Logo from "../../assets/images/logo.png";
import useMediaQuery from "use-mediaquery";

const Login = (props) => {
  const [submitting, isSubmitting] = useState(false);
  const isMobileView = useMediaQuery("only screen and (max-width: 987px)");

  const { addToast } = useToasts();

  const getUserData = (adminToken, values, setSubmitting) => {
    axios
      .get(`${window.ENVIRONMENT.BACKEND_SERVICE}/v1/user/getUserData`, {
        headers: {
          Authorization: `Bearer ${adminToken.data.token}`,
        },
        params: {
          username: values.username,
        },
      })
      .then((res) => {
        props.saveToken(adminToken.data.token, null);
        props.login(true, res.data);
        addToast("Login successfull!", {
          appearance: "success",
        });

        setSubmitting(false);
        isSubmitting(false);
      });
  };

  const authenticateUser = async (values, setSubmitting) => {
    try {
      const credentials = {
        username: `${values.username}`,
        password: `${values.password}`,
      };

      return await axios.post(
        `${window.ENVIRONMENT.BACKEND_SERVICE}/v1/jwt/authenticate`,
        credentials
      );
    } catch (e) {
      addToast("Username/Password incorrect!", {
        appearance: "error",
      });
      setSubmitting(false);
      isSubmitting(false);
    }
  };

  const renderLoginForm = () => {
    return (
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          isSubmitting(true);

          const adminToken = await authenticateUser(values, setSubmitting);

          getUserData(adminToken, values, setSubmitting);
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
              width: isMobileView ? "40vw" : "20vw",
              margin: "5vh auto",
              display: "flex",
              flexDirection: "column",
            }}
            onSubmit={handleSubmit}
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
            <Button.Group
              size={isMobileView ? "tiny" : "small"}
              style={{ margin: "10px auto" }}
            >
              <Button
                color="orange"
                onClick={() => props.setAction("Register")}
              >
                Register
              </Button>
              <Button.Or />
              <Button type="submit" color="instagram" disabled={isSubmitting}>
                Login
              </Button>
            </Button.Group>
          </Form>
        )}
      </Formik>
    );
  };

  return (
    <RegisterLoginWrapper
      style={{
        marginTop: props.accountModal !== undefined && "0vh",
        boxShadow: props.accountModal !== undefined && "none",
      }}
    >
      {submitting === true ? (
        <div style={{ margin: "auto auto" }}>
          <Spinner animation="border" size="lg" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          <Image src={Logo} size="small" style={{ margin: "0 auto" }} />
          <WelcomeWidgetHello
            style={{ margin: "0 auto", fontSize: "25px", color: "black" }}
          >
            Login
          </WelcomeWidgetHello>
          {renderLoginForm()}
        </>
      )}
    </RegisterLoginWrapper>
  );
};

export default connect(null, { login, saveToken })(Login);
