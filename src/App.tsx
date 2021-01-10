import React, { FunctionComponent } from 'react';
import ReactDOM from 'react-dom'
import 'fontsource-roboto';
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
import "./styles/App.css"
import Landing from "./components/Landing"
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

const App: FunctionComponent<React.ReactNode>  = () => {
  return (
    <div className="App">
        <Router>
            <Switch>
                <Route path="/" exact component={Landing}></Route>

            </Switch>
        </Router>
    </div>
  );
}

export default App;
