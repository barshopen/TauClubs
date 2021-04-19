import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Contact from './Scenarios/Contact';
import Navbar from './Components/Navbar';
import AllClubs from './Scenarios/AllClubs';
import Home from './Scenarios/Home';
import Signin from './Scenarios/signIn';
import NewClub from './Scenarios/NewClub';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/allClubs" component={AllClubs} />
            <Route path="/contact" component={Contact} />
            <Route path="/signin" component={Signin} />
            <Route path="/createnewclub" component={NewClub} />
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
