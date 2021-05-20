import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useSetRecoilState } from 'recoil';
import Contact from './Scenarios/Contact';
import NavBar from './Components/NavBar';
import SideBar from './Components/SideBar';
import ExploreClubs from './Scenarios/ExploreClubs';
import Feed from './Components/Feed/Feed';
import ClubSection from './Scenarios/ClubSection/ClubSection';
import { whoami } from './Shared/api';
import { currentUser } from './Shared/atoms';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  container: {
    flex: 1,
    display: 'flex',
    paddingTop: theme.spacing(8),
    height: '100%',
  },
  content: {
    flex: 1,
  },
}));

const App = () => {
  const classes = useStyles();
  const setUser = useSetRecoilState(currentUser);

  useEffect(() => {
    whoami().then(d => (d.id === -1 ? setUser(null) : setUser(d)));
  }, []);

  return (
    <>
      <Router>
        <div className={classes.root}>
          <NavBar />
          <Container className={classes.container}>
            <SideBar />
            <div className={classes.content}>
              <Switch>
                <Route path='/' exact component={Feed} />
                <Route path='/explore' component={ExploreClubs} />
                <Route path='/contact' component={Contact} />
                <Route path='/club' component={ClubSection} />
              </Switch>
            </div>
          </Container>
        </div>
      </Router>
    </>
  );
};

export default App;
