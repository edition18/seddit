import React, { useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { IKeyUserInformation, useThunkDispatch } from "../typeDefinitions";
import { loadAlreadyLoggedIn, test } from "../actions/auth";

type navbarProps = {
  auth: IKeyUserInformation;
};

const Navbar = ({ auth }: navbarProps) => {
  const thunkDispatch = useThunkDispatch();
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
        {auth.email !== undefined && auth.email !== null ? (
          <div>{auth.email} dsadas</div>
        ) : (
          ""
        )}
        <button onClick={() => thunkDispatch({ type: "LOGIN_FAILURE" })}>
          Test props.dispatch-
        </button>
        <button onClick={() => thunkDispatch(test())}>
          Test the dummyaction
        </button>
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state: { auth: IKeyUserInformation }) => ({
  auth: state.auth,
});

// export default connect(mapStateToProps)(Signup);
// export default Signup;

export default connect(mapStateToProps)(Navbar);
