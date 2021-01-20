// import * as actionTypes from "./types";
import firebase from "../config";
import { ThunkDispatch } from "redux-thunk";
import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from "./types";
import { IAuthPayload, IActionCreator, AppThunk } from "../definitions";
// import { ThunkAction } from "redux-thunk";

// normal action type
// interface AuthAction extends Action {
//   // it already has a type string by extending Action
//   payload?: unknown;
// }

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const signup = (email: string, password: string): AppThunk => async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch
): Promise<void> => {
  // the inner function returns void, but this is Async so its a Promise<void> type
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      // authentication successful if you get here
      const currentUser = firebase.auth().currentUser;
      const keyUserInformation: IAuthPayload = {
        email: currentUser ? currentUser.email : undefined,
        uid: currentUser ? currentUser.uid : undefined,
        loading: false,
      };
      dispatch({ type: REGISTER_SUCCESS, payload: keyUserInformation });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + " " + errorMessage);
      dispatch({ type: REGISTER_FAILURE });
      // ..
    });
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const loadAlreadyLoggedIn = (): AppThunk => async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch
): Promise<void> => {
  // recommended way to ensure Auth object complete initialization
  // https://firebase.google.com/docs/auth/web/manage-users
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      const currentUser = firebase.auth().currentUser;

      const keyUserInformation: IAuthPayload = {
        email: currentUser ? currentUser.email : undefined,
        uid: currentUser ? currentUser.uid : undefined,
        loading: false,
      };
      dispatch({ type: LOGIN_SUCCESS, payload: keyUserInformation });
    } else {
      // No user is signed in.

      const keyUserInformation: IAuthPayload = {
        email: undefined,
        uid: undefined,
        loading: false,
      };
      dispatch({ type: LOGIN_FAILURE, payload: keyUserInformation });
    }
  });
};

export const login = (email: string, password: string): AppThunk => async (
  dispatch
): Promise<void> => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      const currentUser = firebase.auth().currentUser;
      const keyUserInformation: IAuthPayload = {
        email: currentUser ? currentUser.email : undefined,
        uid: currentUser ? currentUser.uid : undefined,
        loading: false,
      };
      dispatch({ type: REGISTER_SUCCESS, payload: keyUserInformation });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + errorMessage);
      dispatch({ type: LOGIN_FAILURE });
    });
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const test = () => async (
  // test() => (dispatch: Dispatch) => Promise<void>:
  // the test function, which is a "thunk action creator"
  // - a function that returns:
  // - a function that takes dispatch and returns:
  //   - a Promise with nothing inside
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: ThunkDispatch<any, unknown, IActionCreator>
) => {
  dispatch({ type: LOGIN_FAILURE });
  // no return statement here, so return nil
};

// import { Dispatch } from "redux";
// function test2() {
//   return function (dispatch: Dispatch) {
//     return dispatch({ type: REGISTER_FAILURE });
//   };
// }

// export const test = (): AppThunk => async (dispatch) => {
//   dispatch({ type: LOGIN_FAILURE });
//   // console.log(getState());
// };
