export {};

import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { useDispatch } from "react-redux";
import { IAuthState } from "./reducers/authSlice";

export interface ICombinedState {
  auth: IAuthState;
  alerts: IAlertPayload[];
}

export interface IAlertPayload {
  message?: string;
  id?: string;
  severity?: "error" | "success" | "info" | "warning" | undefined; // this is material ui Alert type
}

export interface IAuthPayload {
  email: string | undefined | null;
  uid: string | undefined | null;
  loading: boolean;
}

export interface IAuthAction {
  type: string;
  payload?: IAuthPayload;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useThunkDispatch = () =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useDispatch<ThunkDispatch<any, unknown, AnyAction>>();
