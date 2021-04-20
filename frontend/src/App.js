import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Contact from './Scenarios/Contact';
import Navbar from './Components/Navbar';
import AllClubs from './Scenarios/AllClubs';
import Home from './Scenarios/Home';
import Signin from './Scenarios/signIn';
import ClubSection from './Scenarios/ClubSection/ClubSection';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/allClubs" component={AllClubs} />
          <Route path="/contact" component={Contact} />
          <Route path="/signin" component={Signin} />
          <Route path="/club" component={ClubSection} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
