import { combineReducers } from "redux";
import authReducer from "./authSlice";
import alertsReducer from "./alertsSlice";
import appReducer from "./appSlice";

const combinedReducers = combineReducers({
  auth: authReducer,
  alerts: alertsReducer,
  app: appReducer,
});

export default combinedReducers;
