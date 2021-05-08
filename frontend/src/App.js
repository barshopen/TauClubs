import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Contact from './Scenarios/Contact';
import NavBar from './Components/NavBar';
import AllClubs from './Scenarios/AllClubs';
// import Home from './Scenarios/Home';
import Feed from './Components/Feed/Feed';
import Signin from './Scenarios/SignIn';
import ClubSection from './Scenarios/ClubSection/ClubSection';
import NewClub from './Scenarios/NewClub';
import Footer from './Components/Footer';

function App() {
  const [showNewClubModal, setShowNewClubModal] = useState(false);
  return (
    <div>
      <NewClub
        showModal={showNewClubModal}
        setClubModal={setShowNewClubModal}
      />
      <Router>
        <NavBar />
        <Switch>
          <Route path='/' exact component={Feed} />
          <Route path='/allClubs' component={AllClubs} />
          <Route path='/contact' component={Contact} />
          <Route path='/signin' component={Signin} />
          <Route path='/club' component={ClubSection} />
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
