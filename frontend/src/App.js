import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Contact from './Scenarios/Contact';
import NavBar from './Components/NavBar';
import SideBar from './Components/SideBar';
import ExploreClubs from './Scenarios/ExploreClubs';
import Home from './Scenarios/Home';
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
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
}));

function App() {
  const classes = useStyles();
  const [showNewClubModal, setShowNewClubModal] = useState(false);

  return (
    <div className={classes.main}>
      <NewClub
        showModal={showNewClubModal}
        setClubModal={setShowNewClubModal}
      />
      <Router>
        <Grid>
          <NavBar />
          <SideBar />
          <Container className={classes.content}>
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/explore' component={ExploreClubs} />
              <Route path='/contact' component={Contact} />
              <Route path='/signin' component={Signin} />
              <Route path='/club' component={ClubSection} />
            </Switch>
          </Container>
          <Footer />
        </Grid>
      </Router>
    </div>
  );
}

export default App;
