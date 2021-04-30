import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Contact from './Scenarios/Contact';
import NavBar from './Components/NavBar';
import SideBar from './Components/SideBar';
import AllClubs from './Scenarios/AllClubs';
import Home from './Scenarios/Home';
import Signin from './Scenarios/SignIn';
import ClubSection from './Scenarios/ClubSection/ClubSection';
import NewClub from './Scenarios/NewClub';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(9),
    padding: theme.spacing(3),
  },
}));

function App() {
  const classes = useStyles();
  const [showNewClubModal, setShowNewClubModal] = useState(false);
  return (
    <div className={classes.root}>
      <NewClub
        showModal={showNewClubModal}
        setClubModal={setShowNewClubModal}
      />
      <Router>
        <NavBar />
        <SideBar />
        <main className={classes.content}>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/allClubs' component={AllClubs} />
            <Route path='/contact' component={Contact} />
            <Route path='/signin' component={Signin} />
            <Route path='/club' component={ClubSection} />
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
