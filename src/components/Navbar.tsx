import React, { useEffect, FunctionComponent, Fragment } from "react";
import Signup from "./Signup";
import Login from "./Login";
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
import { Link } from "react-router-dom";
import { useState } from "react";
import { Alert, AlertTitle } from "@material-ui/lab";

const Navbar: FunctionComponent = () => {
  const authState = useSelector((state: RootState) => state.auth);
  const [signup, showSignup] = useState(false);
  const [login, showLogin] = useState(false);
  const alertsState = useSelector((state: RootState) => state.alerts);
  useEffect(() => {
    if (authState.isAuthenticated) {
      showSignup(false);
      showLogin(false);
    }
  }, [authState.isAuthenticated]);

  const toggleSignup = () => {
    signup ? showSignup(false) : showSignup(true);
  };
  const toggleLogin = () => {
    login ? showLogin(false) : showLogin(true);
  };
  const thunkDispatch = useThunkDispatch();

  useEffect(() => {
    thunkDispatch(loadAlreadyLoggedIn());
  }, [authState.username]);

  return (
    <Fragment>
      <AppBar position="static" color="primary">
        {alertsState.length !== 0 && signup === false && login === false
          ? alertsState.map((alert) => (
              <Alert variant="filled" severity={alert.severity}>
                <AlertTitle>Error</AlertTitle>
                {alert.message}
              </Alert>
            ))
          : ""}
        <Toolbar>
          <IconButton edge="start" color="inherit">
            <RecordVoiceOverIcon />
          </IconButton>

          <Typography variant="h6">Seddit</Typography>
          {!authState.loading ? (
            <Grid container>
              {!authState.uid ? (
                <Grid item>
                  <Button
                    onClick={() => {
                      toggleLogin();
                    }}
                    color="inherit"
                  >
                    Login
                  </Button>
                </Grid>
              ) : (
                ""
              )}
              {login ? <Login toggleLogin={toggleLogin} /> : ""}

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

          {!authState.loading ? (
            <div>
              Hello, {authState.isAuthenticated ? authState.username : "Guest"}
            </div>
          ) : (
            ""
          )}
          {authState.isAuthenticated ? (
            <Button color="inherit" onClick={() => thunkDispatch(logout())}>
              Logout
            </Button>
          ) : (
            <Button
              color="inherit"
              onClick={() => {
                toggleSignup();
              }}
            >
              Signup
            </Button>
          )}
          {signup ? <Signup toggleSignup={toggleSignup} /> : ""}
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

export default Navbar;
