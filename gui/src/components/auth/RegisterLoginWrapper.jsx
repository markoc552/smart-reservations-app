import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const RegisterLoginWrapper = ({ accountModal }) => {
  const [action, setAction] = useState("Login");

  return action === "Login" ? (
    <Login accountModal={accountModal} setAction={setAction} />
  ) : action === "Register" ? (
    <Register accountModal={accountModal} setAction={setAction} />
  ) : (
    <div />
  );
};

export default RegisterLoginWrapper;
