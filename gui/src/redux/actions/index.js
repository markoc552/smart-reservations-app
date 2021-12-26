
export const saveToken = (adminToken, centralToken) => (dispatch) => {
  console.log("Saved token");

  dispatch({ type: "SAVE_TOKEN", payload: { adminToken, centralToken } });
};

export const login = (logged, user) => (dispatch) => {
  console.log("isLogged: ", user);

  dispatch({ type: "LOGGED_IN", payload: { logged, user } });
};
