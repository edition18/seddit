import React, { useEffect, FunctionComponent, Fragment } from "react";
import DialogTest from "./DialogTest";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { useThunkDispatch, RootState } from "../definitions";
import { loadAlreadyLoggedIn, logout } from "../actions/auth";
import { useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar: FunctionComponent = () => {
  const [signup, showSignup] = useState(false);

  const toggleSignup = () => {
    signup ? showSignup(false) : showSignup(true);
  };
  const thunkDispatch = useThunkDispatch();

  const authState = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    thunkDispatch(loadAlreadyLoggedIn());
  }, [authState.username]);

  return (
    <Fragment>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <RecordVoiceOverIcon />
          </IconButton>

          <Typography variant="h6">Seddit</Typography>
          {!authState.loading ? (
            <Grid container>
              <Grid item>
                <Button component={Link} to="/signup" color="inherit">
                  Signup
                </Button>
              </Grid>

              {!authState.uid ? (
                <Grid item>
                  <Button to="/login" component={Link} color="inherit">
                    Login
                  </Button>
                </Grid>
              ) : (
                ""
              )}

              <Grid item>
                <Button color="inherit" component={Link} to="/community/memes">
                  community: memes
                </Button>
              </Grid>
              <Grid item></Grid>
            </Grid>
          ) : (
            ""
          )}
          <Button
            color="inherit"
            onClick={() => {
              toggleSignup();
            }}
          >
            New Signup Test
          </Button>
          {signup ? <DialogTest toggleSignup={toggleSignup} /> : ""}
          {authState.username !== undefined && authState.username !== null ? (
            <div>
              Hello, {authState.username ? authState.username : "Guest"}
            </div>
          ) : (
            ""
          )}
          {authState.isAuthenticated ? (
            <Button color="inherit" onClick={() => thunkDispatch(logout())}>
              Logout
            </Button>
          ) : (
            <CircularProgress />
          )}
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

export default Navbar;

// examples
// const thunkDispatch = useThunkDispatch();
// <button onClick={() => thunkDispatch({ type: "LOGIN_FAILURE" })}>
// Test props.dispatch-
// </button>
// <button onClick={() => thunkDispatch(test())}>
// Test the dummyaction
// </button>

// import firebase from "../config";
// import { v4 as uuidv4 } from "uuid";
// const db = firebase.firestore();

// const post1: IPost = {
//   timeCreated: Date.now(),
//   postid: uuidv4(),
//   uid: "53yPOQMea5Sb3L1Nj2NzBNMTdJ53",
//   community: "memes",
//   header: "check out this dank meme",
//   body: "see title",
// };
// const post2: IPost = {
//   timeCreated: Date.now(),
//   postid: uuidv4(),
//   uid: "53yPOQMea5Sb3L1Nj2NzBNMTdJ53",
//   community: "memes",
//   header: "check out this dank meme, better than the previous!",
//   body: "see title please",
// };
// const post3: IPost = {
//   timeCreated: Date.now(),
//   postid: uuidv4(),
//   uid: "53yPOQMea5Sb3L1Nj2NzBNMTdJ53",
//   community: "memes",
//   header: "seriously, its bad",
//   body: "see title please",
// };

// const postArray: IPost[] = [post1, post2, post3];

// {
//   postArray.forEach((post: IPost) => {
//     db.collection(post.community).add({
//       timeCreated: post.timeCreated,
//       uid: post.uid,
//       community: post.community,
//       header: post.header,
//       body: post.body,
//       thumbnail: post.thumbnail ? post.thumbnail : "",
//     });
//   });
// }
