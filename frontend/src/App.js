// import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Messages from './Components/Messages';
import Contact from './Pages/Contact';
import Navbar from './Components';
import AllClubs from './Pages/AllClubs';

function App() {
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState();

  useEffect(() => {
    fetch('/time', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((mydata) => setData(mydata));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" />
            <Route path="/allClubs" exact component={AllClubs} />
            <Route path="/contact" exact component={Contact} />
          </Switch>
        </Router>
        <Messages />
        {data}
      </header>
    </div>
  );
}

export default App;
