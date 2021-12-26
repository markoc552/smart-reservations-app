import { combineReducers } from "redux";
import AuthReducers from "./authReducers.js";

export default combineReducers({
  auth: AuthReducers,
});
