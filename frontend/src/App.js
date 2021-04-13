import './App.css';
import React, { useState, useEffect } from 'react';
import Messages from './Components/Messages';

function App() {
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
        <Messages />
        {data}
      </header>
    </div>
  );
}

export default App;
