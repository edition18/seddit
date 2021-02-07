// import * as actionTypes from "./types";
import firebase from "../config";
import { ThunkDispatch } from "redux-thunk";
import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  SUBSCRIBE_UPDATE,
} from "./types";

import { IAuthPayload, IActionCreator, AppThunk } from "../definitions";
import { alertError, alertSuccess } from "./alerts";

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
          subscribed: [],
        });

        dispatch({ type: REGISTER_SUCCESS, payload: keyUserInformation });
        dispatch(alertSuccess("registered", "success"));
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
    : firebase.auth().onAuthStateChanged(async function (user) {
        if (user) {
          const currentUser = firebase.auth().currentUser;
          const keyUserInformation: IAuthPayload = {
            email: currentUser ? currentUser.email : undefined,
            uid: currentUser ? currentUser.uid : undefined,
            username: "",
            loading: false,
          };
          await firebase
            .firestore()
            .collection("users")
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                if (doc.get("email").toLowerCase() === currentUser?.email) {
                  keyUserInformation.username = doc.get("username");
                  keyUserInformation.subscribed = doc.get("subscribed");
                }
                return;
              });
            });

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
  await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(async () => {
      const currentUser = firebase.auth().currentUser;
      const keyUserInformation: IAuthPayload = {
        email: currentUser ? currentUser.email : undefined,
        uid: currentUser ? currentUser.uid : undefined,
        username: "",
        loading: false,
      };

      await firebase
        .firestore()
        .collection("users")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.get("email").toLowerCase() === currentUser?.email) {
              keyUserInformation.username = doc.get("username");
              keyUserInformation.subscribed = doc.get("subscribed");
            }
            return;
          });
        });

      dispatch({ type: LOGIN_SUCCESS, payload: keyUserInformation });
      dispatch(alertSuccess("log in success", "success"));
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

export const subscribe = (
  community: string,
  uid: string | null | undefined
): AppThunk => async (dispatch): Promise<void> => {
  await firebase
    .firestore()
    .collection("users")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach(async (doc) => {
        if (doc.id === uid) {
          // I grouped users by UID
          if (!doc.get("subscribed").includes(community)) {
            const updatedSubscribed = [...doc.get("subscribed"), community];
            await firebase.firestore().collection("users").doc(uid).update({
              subscribed: updatedSubscribed,
            });
            dispatch({
              type: SUBSCRIBE_UPDATE,
              payload: {
                subscribed: updatedSubscribed,
              },
            });
          }
        }
      });
    });
};
export const unsubscribe = (
  community: string,
  uid: string | null | undefined
): AppThunk => async (dispatch): Promise<void> => {
  await firebase
    .firestore()
    .collection("users")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach(async (doc) => {
        if (doc.id === uid) {
          // I grouped users by UID
          if (doc.get("subscribed").includes(community)) {
            const updatedSubscribed = doc
              .get("subscribed")
              .filter((x: string) => x !== community);
            await firebase.firestore().collection("users").doc(uid).update({
              subscribed: updatedSubscribed,
            });
            dispatch({
              type: SUBSCRIBE_UPDATE,
              payload: {
                subscribed: updatedSubscribed,
              },
            });
          }
        }
      });
    });
};
