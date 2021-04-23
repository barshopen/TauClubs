import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Contact from './Scenarios/Contact';
import Navbar from './Components/Navbar';
import AllClubs from './Scenarios/AllClubs';
import Home from './Scenarios/Home';
import Signin from './Scenarios/SignIn';
import ClubSection from './Scenarios/ClubSection/ClubSection';
import NewClub from './Scenarios/NewClub';

function App() {
  const [showNewClubModal, setShowNewClubModal] = useState(false);
  return (
    <div>
      <NewClub
        showModal={showNewClubModal}
        setClubModal={setShowNewClubModal}
      />
      <Router>
        <Navbar setShowNewClubModal={setShowNewClubModal} />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/allClubs' component={AllClubs} />
          <Route path='/contact' component={Contact} />
          <Route path='/signin' component={Signin} />
          <Route path='/club' component={ClubSection} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
