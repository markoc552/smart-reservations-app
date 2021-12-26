import axios from "axios";

export const createAccount = async (values, role) => {
  const result = await axios.post(
    `${window.ENVIRONMENT.BACKEND_SERVICE}/v1/user/createUser`,
    { ...values, role: role }
  );

  return result;
};

export const getAdminToken = async (credentials) => {
  const result = await axios.post(
    `${window.ENVIRONMENT.BACKEND_SERVICE}/v1/jwt/authenticate`,
    credentials
  );

  return result;
};
