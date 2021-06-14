import React from 'react';
import { useMutation } from 'react-query';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useRecoilValue, useRecoilState } from 'recoil';
import Contact from './Scenarios/Contact';
import NavBar from './Components/NavBar';
import ExploreClubs from './Scenarios/ExploreClubs';
import Feed from './Components/Feed/Feed';
import ClubSection from './Scenarios/ClubSection/ClubSection';
import { whoami } from './Shared/api';
import { currentUser, mainSearch } from './Shared/atoms';
import GeneralProfile from './Components/Accounts/GeneralProfile';
import AppSideBar from './Components/GeneralSideBar/AppSideBar';
import useFeed from './hooks/useFeed';

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
  const [user, setUser] = useRecoilState(currentUser);
  const search = useRecoilValue(mainSearch);
  const { feed } = useFeed();

  useMutation(whoami, { onSuccess: setUser });

  return (
    <>
      <Router>
        <div className={classes.root}>
          <NavBar />
          <Container className={classes.container}>
            <AppSideBar />
            <div className={classes.content}>
              <Switch>
                {(!user || feed.length === 0) && (
                  <Route path='/' exact component={ExploreClubs} />
                )}
                {user && !search && <Route path='/' exact component={Feed} />}
                <Route
                  path={search ? '/' : '/explore'}
                  component={ExploreClubs}
                />
                <Route path='/contact' component={Contact} />
                <Route path='/club' component={ClubSection} />
                <Route path='/profile' component={GeneralProfile} />
              </Switch>
            </div>
          </Container>
        </div>
      </Router>
    </>
  );
};

export default App;
