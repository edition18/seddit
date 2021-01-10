import React, { FunctionComponent } from 'react';
import ReactDOM from 'react-dom'
import 'fontsource-roboto';
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
import "./styles/App.css"
import Landing from "./components/Landing"

const App: FunctionComponent<React.ReactNode>  = () => {
  return (
    <div className="App">
      <Landing />
    </div>
  );
}

export default App;
