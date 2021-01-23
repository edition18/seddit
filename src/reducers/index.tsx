import { combineReducers } from "redux";
import authReducer from "./authSlice";
import alertsReducer from "./alertsSlice";
import postsReducer from "./postsSlice";

const combinedReducers = combineReducers({
  auth: authReducer,
  alerts: alertsReducer,
  posts: postsReducer,
});

export default combinedReducers;
