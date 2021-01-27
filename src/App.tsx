import React, { FunctionComponent } from "react";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import Test from "./components/Test";
import PostCreate from "./components/Post/PostCreate";
import CommunityLanding from "./components/CommunityLanding";
import { ThemeProvider } from "@material-ui/core/styles";
import "./styles/App.css";
import theme from "./styles/theme";
import "fontsource-roboto";
import { Provider } from "react-redux";
import { store } from "./store";
// import MasterSidebar from "./components/Sidebar/MasterSidebar";
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
                {/* the switch needs to be direct parent of route */}
                <Route path="/" exact component={Landing}></Route>
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
                <Grid item xs={3}>
                  {/* <MasterSidebar /> */}
                </Grid>
              </Switch>
            </Grid>
          </Grid>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
