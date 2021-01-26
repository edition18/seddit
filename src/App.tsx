import React, { FunctionComponent } from "react";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Test from "./components/Test";
import PostCreate from "./components/Post/PostCreate";
import CommunityLanding from "./components/CommunityLanding";
import { ThemeProvider } from "@material-ui/core/styles";
import "./styles/App.css";
import theme from "./styles/theme";
import "fontsource-roboto";
import { Provider } from "react-redux";
import { store } from "./store";
// import { AccessAlarm, ThreeDRotation } from "@material-ui/icons";
// import firebase from "./config";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

const App: FunctionComponent = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar />

          <Grid container>
            <Grid item xs={9}>
              <Switch>
                <Route path="/" exact component={Landing}></Route>
                <Route path="/signup" exact component={Signup}></Route>
                <Route path="/login" exact component={Login}></Route>
                <Route path="/test" exact component={Test}></Route>
                <Route
                  exact
                  path="/community/:community"
                  component={CommunityLanding}
                />
                <Route
                  exact
                  path="/community/:community/createpost"
                  component={PostCreate}
                />
              </Switch>
            </Grid>
            <Grid item xs={3}>
              <Grid container>
                <Grid item xs={12}></Grid>
              </Grid>
            </Grid>
          </Grid>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
