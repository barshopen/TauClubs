import './App.css';
import {useState, useEffect} from 'react';


function App() {
  const [data, setData] = useState();
  
  useEffect(()=>{
    fetch("/time", {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
    .then(res=>res.json())
    .then(mydata=>setData(mydata));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
          It's working!
        {data}
      </header>
    </div>
  );
}

export default App;
