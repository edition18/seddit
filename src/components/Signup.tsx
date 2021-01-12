import React, { FunctionComponent, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab"; // for Lab components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import useStyles from "../styles/customStyles";

// import firebase from "./config";

const Signup: FunctionComponent<React.ReactNode> = () => {
  const classes = useStyles();

  // const [email, setEmail] = useState(String);

  const [alert] = useState({
    message: "test",
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
    console.log(formData);
  };

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   console.log(event);
  //   console.log(event);
  // };

  // // check if password match
  // if not , alert // set timeout callback on the state?
  // if not check the

  return (
    <Container maxWidth="xs">
      {alert.message !== "" ? (
        <Alert variant="filled" severity="error">
          <AlertTitle>Error</AlertTitle>
          {alert.message}
        </Alert>
      ) : (
        ""
      )}
      <form noValidate autoComplete="off">
        <Grid container className={classes.container}>
          {/* adds more padding w/ this subcontainer*/}
          <Grid container className={classes.subcontainer}>
            <Grid item xs={12}>
              <TextField
                name="email"
                onChange={onChange}
                className={classes.textFields}
                id="outlined-basic"
                label="email"
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Grid container className={classes.subcontainer}>
            <Grid item xs={12}>
              <TextField
                name="password"
                onChange={onChange}
                id="outlined-basic"
                label="password"
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Grid container className={classes.subcontainer}>
            <Grid item xs={12}>
              <TextField
                name="passwordConfirm"
                onChange={onChange}
                id="outlined-basic"
                label="passwordConfirm"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Grid>
        <Button>Check</Button>
      </form>
    </Container>
  );
};

export default Signup;
