export {};

import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { useDispatch } from "react-redux";

export interface IKeyUserInformation {
  email: string | null | undefined;
  uid: string | null | undefined;
  loading: boolean;
}

export interface IAuthAction {
  type: string;
  payload?: IKeyUserInformation;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useThunkDispatch = () =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useDispatch<ThunkDispatch<any, unknown, AnyAction>>();
