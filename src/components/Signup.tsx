import React, { FunctionComponent, useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab"; // for Lab components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import useStyles from "../styles/customStyles";
import { connect } from "react-redux";
import { signup, loadAlreadyLoggedIn } from "../actions/auth";

// import firebase from "../config";

const Signup: FunctionComponent = () => {
  const [alerts, setAlerts] = useState<string[]>([]);
  useEffect(() => {
    loadAlreadyLoggedIn();
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
    console.log(formData);
  };

  // event: React.MouseEvent<HTMLButtonElement>
  const onSubmit = async () => {
    if (formData.password !== formData.passwordConfirm) {
      setAlerts([...alerts, "Check your password!"]);
      return;
    }
    // create account and autosignin
    // firebase does not require me to use JWT to encode password
    signup(formData.email, formData.password);
    // firebase
    //   .auth()
    //   .createUserWithEmailAndPassword(formData.email, formData.password)
    //   .then(() => {
    //     const currentUser = firebase.auth().currentUser;
    //     currentUser ? console.log(currentUser.toJSON()) : "";
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.log(errorCode + " " + errorMessage);
    //     // ..
    //   });

    // console.log(event);
    // setAlerts([...alerts, "hello"]);
    // event.preventDefault();
    // console.log(event);
    // console.log(event);
  };

  return (
    <Container maxWidth="xs">
      {alerts.length !== 0
        ? alerts.map((message) => (
            <Alert variant="filled" severity="error">
              <AlertTitle>Error</AlertTitle>
              {message}
            </Alert>
          ))
        : ""}
      <form noValidate autoComplete="off">
        <Grid container className={classes.container}>
          {/* adds more padding w/ this subcontainer*/}
          <Grid container className={classes.subcontainer}>
            <Grid item xs={12} className={classes.centerGridItem}>
              <TextField
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

const mapStateToProps = () => ({});

// export default connect(mapStateToProps)(Signup);
// export default Signup;

export default connect(mapStateToProps, { signup })(Signup);
