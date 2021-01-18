import React, { useEffect, FunctionComponent } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { ICombinedState } from "../typeDefinitions";
import { loadAlreadyLoggedIn } from "../actions/auth";
import { useSelector } from "react-redux";

const Navbar: FunctionComponent = () => {
  // const selectAuth = (state: { auth: IAuthState }) => state.auth;
  // const authState = useSelector(selectAuth);

  const authState = useSelector((state: ICombinedState) => state.auth);

  useEffect(() => {
    loadAlreadyLoggedIn();
  }, []);
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <RecordVoiceOverIcon />
        </IconButton>
        <Typography variant="h6">Seddit</Typography>
        <Button color="inherit" href="/signup">
          Signup
        </Button>
        <Button color="inherit">Login</Button>
        {authState.email !== undefined && authState.email !== null ? (
          <div>{authState.email} dsadas</div>
        ) : (
          ""
        )}
      </Toolbar>
    </AppBar>
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
