import { combineReducers } from "redux";
import AuthReducers from "./authReducers.js";
import ManagmentReducers from "./managmentReducers.js";

export default combineReducers({
  auth: AuthReducers,
  managment: ManagmentReducers,
});
