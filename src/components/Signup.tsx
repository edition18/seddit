import React, { FunctionComponent, useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab"; // for Lab components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import useStyles from "../styles/customStyles";
import { signup, loadAlreadyLoggedIn } from "../actions/auth";
import { alertError } from "../actions/alerts";
import { ICombinedState, useThunkDispatch } from "../typeDefinitions";

import { useSelector } from "react-redux";

// import firebase from "../config";

const Signup: FunctionComponent = () => {
  const thunkDispatch = useThunkDispatch();
  const authState = useSelector((state: ICombinedState) => state.auth);
  const alertsState = useSelector((state: ICombinedState) => state.alerts);

  const [alerts, setAlerts] = useState<string[]>([]);
  useEffect(() => {
    thunkDispatch(loadAlreadyLoggedIn());

    setTimeout(() => setAlerts([]), 10000);
  }, [alert]);
  const classes = useStyles();

  // const [email, setEmail] = useState(String);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
  };

  // event: React.MouseEvent<HTMLButtonElement>
  const onSubmit = async () => {
    if (formData.password !== formData.passwordConfirm) {
      setAlerts([...alerts, "Check your password!"]);
      alertError("Check Password!", "error");
      return;
    }

    thunkDispatch(signup(formData.email, formData.password));
  };

  return (
    <Container maxWidth="xs">
      {alertsState.length !== 0
        ? alertsState.map((alert) => (
            <Alert variant="filled" severity={alert.severity}>
              <AlertTitle>Error</AlertTitle>
              {alert.message}
            </Alert>
          ))
        : ""}
      <form noValidate autoComplete="off">
        <Grid container className={classes.container}>
          {/* adds more padding w/ this subcontainer*/}
          <Grid container className={classes.subcontainer}>
            <Grid item xs={12} className={classes.centerGridItem}>
              <TextField
                disabled={authState.isAuthenticated}
                name="email"
                onChange={onChange}
                className={classes.textFields}
                id="email"
                label="email"
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Grid container className={classes.subcontainer}>
            <Grid item xs={12} className={classes.centerGridItem}>
              <TextField
                disabled={authState.isAuthenticated}
                name="password"
                type="password"
                onChange={onChange}
                id="password"
                label="password"
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Grid container className={classes.subcontainer}>
            <Grid item xs={12} className={classes.centerGridItem}>
              <TextField
                disabled={authState.isAuthenticated}
                name="passwordConfirm"
                type="password"
                onChange={onChange}
                id="passwordConfirm"
                label="passwordConfirm"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Grid>
        <Button onClick={onSubmit}>Check</Button>
      </form>
    </Container>
  );
};

export default Signup;
