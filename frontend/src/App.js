import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Contact from './Scenarios/Contact';
import NavBar from './Components/NavBar';
import SideBar from './Components/SideBar';
import ExploreClubs from './Scenarios/ExploreClubs';
import Feed from './Components/Feed/Feed';
import Signin from './Scenarios/SignIn';
import ClubSection from './Scenarios/ClubSection/ClubSection';
import NewClub from './Scenarios/NewClub';
import Footer from './Components/Footer';

const useStyles = makeStyles(theme => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    paddingTop: theme.spacing(9),
    padding: theme.spacing(3),
  },
  container: {
    flexGrow: 1,
    padding: theme.spacing(3),
    height: '100%',
  },
}));

function App() {
  const classes = useStyles();
  const [showNewClubModal, setShowNewClubModal] = useState(false);

  return (
    <>
      <NewClub
        showModal={showNewClubModal}
        setClubModal={setShowNewClubModal}
      />
      <Router>
        <NavBar />
        <div className={classes.main}>
          <SideBar />
          <Container>
            <Switch>
              <Route path='/' exact component={Feed} />
              <Route path='/allClubs' component={ExploreClubs} />
              <Route path='/contact' component={Contact} />
              <Route path='/signin' component={Signin} />
              <Route path='/club' component={ClubSection} />
            </Switch>
          </Container>
        </div>
      </Router>
    </>
  );
}

export default App;
