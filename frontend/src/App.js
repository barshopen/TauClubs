import './App.css';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './Scenarios/Home';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Home />
        </Router>
      </header>
    </div>
  );
}

export default App;
