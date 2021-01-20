import React, { FunctionComponent } from "react";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { ThemeProvider } from "@material-ui/core/styles";
import "./styles/App.css";
import theme from "./styles/theme";
import "fontsource-roboto";
import { Provider } from "react-redux";
import { store } from "./store";
// import { AccessAlarm, ThreeDRotation } from "@material-ui/icons";
// import firebase from "./config";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App: FunctionComponent = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Router>
          <Switch>
            <Route path="/" exact component={Landing}></Route>
            <Route path="/signup" exact component={Signup}></Route>
            <Route path="/login" exact component={Login}></Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
