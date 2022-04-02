import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Landing from './Landing';
import Projects from './Projects';
import Portfolio from './Portfolio';
import Profile from './Profile';
import CreateProject from './CreateProject';
import Positions from './Positions';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
            <Route path="/projects">
              <Projects />
            </Route>
            <Route path="/portfolio">
              <Portfolio />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/create-project">
              <CreateProject />
            </Route>
            <Route path="/positions/:id" >
              <Positions />
            </Route>
            <Route path="/">
              <Landing />
            </Route>
          </Switch>
      </div>
    </Router>
  );
}

export default App;
