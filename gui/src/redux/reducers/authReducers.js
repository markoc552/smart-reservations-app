const authReducers = (state = { logged: false }, action) => {
  if (action.type === "SAVE_TOKEN") {
    return {
      ...state,
      token: action.payload.adminToken,
      centralToken: action.payload.centralToken,
    };
  } else if (action.type === "LOGGED_IN") {
    return {
      ...state,
      logged: action.payload.logged,
      user: action.payload.user,
    };
  } else {
    return state;
  }
};

export default authReducers;
