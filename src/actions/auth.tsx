export {};
// import * as actionTypes from "./types";
import firebase from "../config";
import { store } from "../store";

import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from "./types";
import { IKeyUserInformation } from "../typeDefinitions";
// import { Action, ActionCreator, Dispatch } from "redux";
// import { ThunkAction } from "redux-thunk";
// import { useDispatch } from "react-redux";

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

// export async function loadAlreadyLoggedIn(): Promise<void> {
//   const currentUser = firebase.auth().currentUser;

//   const keyUserInformation: IKeyUserInformation = {
//     email: currentUser ? currentUser.email : "",
//     uid: currentUser ? currentUser.uid : "",
//   };

//   store.dispatch({ type: LOGIN_SUCCESS, payload: keyUserInformation });
// }

// export const loadAlreadyLoggedIn = () => async (
//   dispatch: typeof store.dispatch
// ): Action<void> => {
//   console.log("yes");
//   dispatch({ type: REGISTER_SUCCESS });
// };

// export const signup = (email: string, password: string) => async (
//   dispatch: Dispatch
// ): Promise<void> => {
//   // const action: [number, Promise<T>] = [1, "string"];
//   // Promise<T>
//   try {
//     firebase
//       .auth()
//       .createUserWithEmailAndPassword(email, password)
//       .then((user) => {
//         // authentication successful if you get here
//         console.log(user);
//         dispatch({ type: REGISTER_SUCCESS });
//         // type
//         // payload
//       });
//   } catch (error) {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     console.log(errorCode + " " + errorMessage);
//     // auth fail if you get here
//     dispatch({ type: REGISTER_FAILURE });
//   }
// };
