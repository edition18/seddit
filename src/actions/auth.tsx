export {};
// import * as actionTypes from "./types";
import firebase from "../config";
import { store } from "../store";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from "./types";
import { IKeyUserInformation } from "../typeDefinitions";
// import { ThunkAction } from "redux-thunk";

// normal action type
// interface AuthAction extends Action {
//   // it already has a type string by extending Action
//   payload?: unknown;
// }

export async function signup(email: string, password: string): Promise<void> {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      // authentication successful if you get here
      const currentUser = firebase.auth().currentUser;
      const keyUserInformation: IKeyUserInformation = {
        email: currentUser ? currentUser.email : "",
        uid: currentUser ? currentUser.uid : "",
        loading: false,
      };
      store.dispatch({ type: REGISTER_SUCCESS, payload: keyUserInformation });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + " " + errorMessage);
      store.dispatch({ type: REGISTER_FAILURE });
      // ..
    });
}

export async function loadAlreadyLoggedIn(): Promise<void> {
  // recommended way to ensure Auth object complete initialization
  // https://firebase.google.com/docs/auth/web/manage-users
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      const currentUser = firebase.auth().currentUser;

      const keyUserInformation: IKeyUserInformation = {
        email: currentUser ? currentUser.email : "",
        uid: currentUser ? currentUser.uid : "",
        loading: false,
      };
      store.dispatch({ type: LOGIN_SUCCESS, payload: keyUserInformation });
    } else {
      // No user is signed in.
      store.dispatch({ type: LOGIN_FAILURE });
    }
  });
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const test = () => async (
  // test() => (dispatch: Dispatch) => Promise<void>:
  // the test function, which is a "thunk action creator"
  // - a function that returns:
  // - a function that takes dispatch and returns:
  //   - a Promise with nothing inside
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: ThunkDispatch<any, unknown, AnyAction>
) => {
  dispatch({ type: LOGIN_FAILURE });

  // no return statement here, so return nil
};
