import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Contact from './Pages/Contact';
import Navbar from './Navbar';
import AllClubs from './Pages/AllClubs';
import Home from './Pages/Home';
import Signin from './Pages/signIn';

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
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
