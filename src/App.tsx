import React,  { FunctionComponent , Fragment} from 'react';
import ReactDOM from 'react-dom'
import 'fontsource-roboto';
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
import "./styles/App.css"
import Landing from "./components/Landing"
import Navbar from "./components/Navbar"
import { ThemeProvider } from '@material-ui/core/styles';
import theme from "./styles/theme"

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

const App: FunctionComponent<React.ReactNode>  = () => {
  return (
    <ThemeProvider theme={theme}>      
      <Navbar />
      <Router>
        <Switch>
            <Route path="/" exact component={Landing}></Route>

        </Switch>
      </Router>
    </ThemeProvider>

  );
}

export default App;
