import React, { FunctionComponent } from 'react';
import ReactDOM from 'react-dom'
import 'fontsource-roboto';
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
import "./styles/App.css"
import Landing from "./components/Landing"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const App: FunctionComponent<React.ReactNode>  = () => {
  return (
    <div className="App">
    <Router>
      <Route path="/" component={Landing}></Route>

    </Router>
    </div>
  );
}

export default App;
