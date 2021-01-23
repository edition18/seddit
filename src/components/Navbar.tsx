import React, { useEffect, FunctionComponent, Fragment } from "react";
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

const Navbar: FunctionComponent = () => {
  const thunkDispatch = useThunkDispatch();

  const authState = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    thunkDispatch(loadAlreadyLoggedIn());
  }, []);

  return (
    <Fragment>
      {!authState.loading ? (
        <AppBar position="static" color="primary">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <RecordVoiceOverIcon />
            </IconButton>
            <Typography variant="h6">Seddit</Typography>
            <Grid container>
              <Grid item>
                <Button color="inherit" href="/signup">
                  Signup
                </Button>
              </Grid>

              {!authState.uid ? (
                <Grid item>
                  <Button color="inherit" href="/login">
                    Login
                  </Button>
                </Grid>
              ) : (
                ""
              )}

              <Grid item>
                <Button color="inherit" href="/community/memes">
                  community: memes
                </Button>
              </Grid>
              <Grid item></Grid>
            </Grid>

            {authState.email !== undefined && authState.email !== null ? (
              <div>Hello, {authState.email ? authState.email : "Guest"}</div>
            ) : (
              ""
            )}
            {authState.uid ? (
              <Button color="inherit" onClick={() => thunkDispatch(logout())}>
                Logout
              </Button>
            ) : (
              ""
            )}
          </Toolbar>
        </AppBar>
      ) : (
        ""
      )}
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
