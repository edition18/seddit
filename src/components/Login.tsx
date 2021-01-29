import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Alert, AlertTitle } from "@material-ui/lab"; // for Lab components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import useStyles from "../styles/customStyles";
import React, { FunctionComponent, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { login } from "../actions/auth";
import { RootState, useThunkDispatch } from "../definitions";
import { useSelector } from "react-redux";

interface LoginProps {
  toggleLogin: () => void;
}

const Login: FunctionComponent<LoginProps> = ({ toggleLogin }) => {
  const handleClose = () => {
    toggleLogin();
  };
  const thunkDispatch = useThunkDispatch();
  const authState = useSelector((state: RootState) => state.auth);
  const alertsState = useSelector((state: RootState) => state.alerts);

  const classes = useStyles();

  // const [email, setEmail] = useState(String);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
  };

  // event: React.MouseEvent<HTMLButtonElement>
  const onSubmit = async () => {
    thunkDispatch(login(formData.email, formData.password));
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle id="alert-dialog-title">{"Login"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Login to your account
        </DialogContentText>
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
            </Grid>
            <Button
              disabled={authState.isAuthenticated}
              fullWidth
              onClick={onSubmit}
            >
              Login
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

export default Login;
