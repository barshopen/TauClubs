// import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Contact from './Pages/Contact';
import Navbar from './Components';
import AllClubs from './Pages/AllClubs';
import Home from './Pages';
import signin from './Pages/signIn';

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
            <Route path="/SignIn" component={signin} />
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
