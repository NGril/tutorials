import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import streamReducer from "./streamReducer";

export default combineReducers({
  auth: authReducer,
  streams: streamReducer,
  // this is a special reducer created by redux form - the key name also needs to be form in order for everything to work correctly, we use an alias import for clarity
  form: formReducer,
});
