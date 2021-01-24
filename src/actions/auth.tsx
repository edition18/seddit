// import * as actionTypes from "./types";
import firebase from "../config";
import { ThunkDispatch } from "redux-thunk";
import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from "./types";

import { IAuthPayload, IActionCreator, AppThunk } from "../definitions";
import { alertError } from "./alerts";

// normal action type
// interface AuthAction extends Action {
//   // it already has a type string by extending Action
//   payload?: unknown;
// }

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const signup = (
  email: string,
  password: string,
  username: string
): AppThunk => async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch
): Promise<void> => {
  // the inner function returns void, but this is Async so its a Promise<void> type

  //https://stackoverflow.com/questions/40389946/how-do-i-set-the-displayname-of-firebase-user/40429080

  //check if username already exists?
  let userNameExists = false;

  await firebase
    .firestore()
    .collection("users")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) =>
        doc.get("username").toLowerCase() === username.toLowerCase()
          ? (userNameExists = true)
          : ""
      );
    });

  if (userNameExists) {
    dispatch(
      alertError("usename already exists, please select another?", "error")
    );
    return;
  } else {
    //create the auth user
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        // authentication successful if you get here
        const currentUser = firebase.auth().currentUser;
        const keyUserInformation: IAuthPayload = {
          email: currentUser ? currentUser.email : undefined,
          uid: currentUser ? currentUser.uid : undefined,
          username: username,
          loading: false,
        };
        //create the account doc in the collection "users"
        firebase.firestore().collection("users").doc(currentUser?.uid).set({
          email: currentUser?.email,
          username: username,
        });

        dispatch({ type: REGISTER_SUCCESS, payload: keyUserInformation });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + " " + errorMessage);
        dispatch({ type: REGISTER_FAILURE });
        dispatch(alertError("email already exists", "error"));

        // ..
      });
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const loadAlreadyLoggedIn = (): AppThunk => async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch,
  getState
): Promise<void> => {
  // recommended way to ensure Auth object complete initialization
  // https://firebase.google.com/docs/auth/web/manage-users

  getState().auth.isAuthenticated
    ? ""
    : await firebase.auth().onAuthStateChanged(async function (user) {
        console.log(user);
        if (user) {
          let username = "";
          const currentUser = firebase.auth().currentUser;
          await firebase
            .firestore()
            .collection("users")
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) =>
                doc.get("email").toLowerCase() === currentUser?.email
                  ? (username = doc.get("username"))
                  : ""
              );
            });

          const keyUserInformation: IAuthPayload = {
            email: currentUser ? currentUser.email : undefined,
            uid: currentUser ? currentUser.uid : undefined,
            username: username,
            loading: false,
          };
          dispatch({ type: LOGIN_SUCCESS, payload: keyUserInformation });
        } else {
          // No user is signed in.

          const keyUserInformation: IAuthPayload = {
            email: undefined,
            uid: undefined,
            loading: false,
            username: undefined,
          };
          dispatch({ type: LOGIN_FAILURE, payload: keyUserInformation });
        }
      });
};

export const login = (email: string, password: string): AppThunk => async (
  dispatch
): Promise<void> => {
  let username = "";

  await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(async () => {
      await firebase
        .firestore()
        .collection("users")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) =>
            doc.get("email").toLowerCase() === email
              ? (username = doc.get("username"))
              : ""
          );
        });

      const currentUser = firebase.auth().currentUser;

      const keyUserInformation: IAuthPayload = {
        email: currentUser ? currentUser.email : undefined,
        uid: currentUser ? currentUser.uid : undefined,
        username: username,
        loading: false,
      };
      dispatch({ type: LOGIN_SUCCESS, payload: keyUserInformation });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + errorMessage);
      dispatch({ type: LOGIN_FAILURE });
    });
};

export const logout = (): AppThunk => async (dispatch): Promise<void> => {
  firebase.auth().signOut();
  dispatch({ type: LOGOUT });
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

// // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// export const signup = (email: string, password: string): AppThunk => async (
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   dispatch
// ): Promise<void> => {
//   // the inner function returns void, but this is Async so its a Promise<void> type

//   //https://stackoverflow.com/questions/40389946/how-do-i-set-the-displayname-of-firebase-user/40429080
//   await firebase
//     .auth()
//     .createUserWithEmailAndPassword(email, password)
//     .then(() => {
//       // authentication successful if you get here
//       const currentUser = firebase.auth().currentUser;
//       const keyUserInformation: IAuthPayload = {
//         email: currentUser ? currentUser.email : undefined,
//         uid: currentUser ? currentUser.uid : undefined,
//         loading: false,
//       };
//       dispatch({ type: REGISTER_SUCCESS, payload: keyUserInformation });
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.log(errorCode + " " + errorMessage);
//       dispatch({ type: REGISTER_FAILURE });
//       dispatch(alertError("email already exists", "error"));

//       // ..
//     });
// };

// // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// export const loadAlreadyLoggedIn = (): AppThunk => async (
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   dispatch
// ): Promise<void> => {
//   // recommended way to ensure Auth object complete initialization
//   // https://firebase.google.com/docs/auth/web/manage-users
//   await firebase.auth().onAuthStateChanged(function (user) {
//     if (user) {
//       const currentUser = firebase.auth().currentUser;
//       console.log(currentUser);
//       const keyUserInformation: IAuthPayload = {
//         email: currentUser ? currentUser.email : undefined,
//         uid: currentUser ? currentUser.uid : undefined,
//         loading: false,
//       };
//       dispatch({ type: LOGIN_SUCCESS, payload: keyUserInformation });
//     } else {
//       // No user is signed in.

//       const keyUserInformation: IAuthPayload = {
//         email: undefined,
//         uid: undefined,
//         loading: false,
//       };
//       dispatch({ type: LOGIN_FAILURE, payload: keyUserInformation });
//     }
//   });
// };
