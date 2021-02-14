import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import React, { FunctionComponent, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab"; // for Lab components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import useStyles from "../styles/customStyles";
import { signup } from "../actions/auth";
import { alertError } from "../actions/alerts";
import { RootState, useThunkDispatch } from "../definitions";

import { useSelector } from "react-redux";

interface SignupProps {
  toggleSignup: () => void;
}

const Signup: FunctionComponent<SignupProps> = ({ toggleSignup }) => {
  const authState = useSelector((state: RootState) => state.auth);
  const alertsState = useSelector((state: RootState) => state.alerts);

  const handleClose = () => {
    toggleSignup();
  };
  const thunkDispatch = useThunkDispatch();

  const classes = useStyles();

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    passwordConfirm: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
  };

  const onSubmit = async () => {
    if (formData.password !== formData.passwordConfirm) {
      thunkDispatch(alertError("Check Password!", "error"));
      return;
    }

    thunkDispatch(signup(formData.email, formData.password, formData.username));
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle id="alert-dialog-title">{"Signup"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Sign up to join the hottest communities today
        </DialogContentText>
        <Container maxWidth="xs">
          {alertsState.length !== 0
            ? alertsState.map((alert) =>
                alert.severity === "error" ? (
                  <Alert variant="filled" severity={alert.severity}>
                    <AlertTitle>Error</AlertTitle>
                    {alert.message}
                  </Alert>
                ) : (
                  ""
                )
              )
            : ""}
          <form noValidate autoComplete="off">
            <Grid container className={classes.defaultPadding}>
              {/* adds more padding w/ this subcontainer*/}
              <Grid container>
                <Grid item xs={12} className={classes.centerChildElements}>
                  <TextField
                    disabled={authState.isAuthenticated}
                    name="email"
                    onChange={onChange}
                    className={classes.textFields}
                    id="email"
                    label={
                      authState.isAuthenticated ? "Already Logged In" : "email"
                    }
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} className={classes.centerChildElements}>
                  <TextField
                    disabled={authState.isAuthenticated}
                    name="username"
                    onChange={onChange}
                    className={classes.textFields}
                    id="username"
                    label={
                      authState.isAuthenticated
                        ? "Already Logged In"
                        : "username"
                    }
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} className={classes.centerChildElements}>
                  <TextField
                    disabled={authState.isAuthenticated}
                    name="password"
                    type="password"
                    onChange={onChange}
                    id="password"
                    label={
                      authState.isAuthenticated
                        ? "Already Logged In"
                        : "password"
                    }
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} className={classes.centerChildElements}>
                  <TextField
                    disabled={authState.isAuthenticated}
                    name="passwordConfirm"
                    type="password"
                    onChange={onChange}
                    id="passwordConfirm"
                    label={
                      authState.isAuthenticated
                        ? "Already Logged In"
                        : "passwordConfirm"
                    }
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Button
              disabled={authState.isAuthenticated}
              classes={{ disabled: classes.disabledButton }}
              onClick={onSubmit}
              fullWidth
            >
              Signup
            </Button>
          </form>
        </Container>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Signup;
