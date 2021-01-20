import { combineReducers } from "redux";
import authReducer from "./authSlice";
import alertsReducer from "./alertsSlice";

const combinedReducers = combineReducers({
  auth: authReducer,
  alerts: alertsReducer,
});

export default combinedReducers;
