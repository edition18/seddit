// src > firebase.js

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBytYwx-_RxG987r55wBpjpKFZAUQIbB2M",
  authDomain: "seddit-4ef23.firebaseapp.com",
  projectId: "seddit-4ef23",
  storageBucket: "seddit-4ef23.appspot.com",
  messagingSenderId: "1008282914558",
  appId: "1:1008282914558:web:932fecb7735d7d3cc35faf",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
