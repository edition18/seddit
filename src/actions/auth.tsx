export {};
// import * as actionTypes from "./types";
import firebase from "../config";
// import { REGISTER_SUCCESS } from "./types";

export function Signup(email: string, password: string): void {
  // const action: [number, Promise<T>] = [1, "string"];
  // Promise<T>
  try {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        // authentication successful if you get here
        console.log(user);

        // type
        // payload
      });
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode + " " + errorMessage);
    // auth fail if you get here
  }
}
