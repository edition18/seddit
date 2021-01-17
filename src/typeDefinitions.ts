export {};

// import { ThunkAction } from "redux-thunk";
// import { StateTree } from "react-redux";
// // import { store } from "./store";

// export interface IPayload<T> {
//   type: string;
//   payload?: T;
// }

// export interface IAuthState {
//   type: string;
//   payload: null | {string[]};
// }

export interface IKeyUserInformation {
  email: string | null | undefined;
  uid: string | null | undefined;
  loading: boolean;
}

export interface IAuthAction {
  type: string;
  payload?: IKeyUserInformation;
}
