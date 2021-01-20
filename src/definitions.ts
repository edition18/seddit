export {};

import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import { useDispatch } from "react-redux";

import combinedReducers from "./reducers/index";

export type RootState = ReturnType<typeof combinedReducers>;
export type AppThunk = ThunkAction<void, RootState, unknown, AnyAction>;
export interface IAlertPayload {
  message?: string;
  id?: string;
  severity?: "error" | "success" | "info" | "warning" | undefined; // this is material ui Alert type
}

export interface IActionCreator extends AnyAction {
  // a Action that has a type and can also accomodate a payload
  type: string;
  payload?: IAlertPayload | IAuthPayload;
}

export interface IAuthState extends IAuthPayload {
  isAuthenticated: boolean;
}

export interface IAuthPayload {
  email: string | undefined | null;
  uid: string | undefined | null;
  loading: boolean;
}

export interface IAppState {
  loading: boolean;
}

export interface IAppPayload {
  loading: boolean;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useThunkDispatch = () =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();

//useDispatch is a function that returns another function that asks for an argument for Dispatch
// so inorder to supply the argument to the returned function we need to do useDispatch()(arg)
// which is how we utilize the hook
