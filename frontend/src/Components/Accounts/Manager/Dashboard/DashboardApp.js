import React from 'react';
import PropTypes from 'prop-types';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import DashboardLayout from './components/DashboardLayout';
import Account from '../../User/Account';
import UsersList from './pages/UsersList';
import Dashboard from './pages/Dashboard';
import Clubs from './pages/Clubs';
import './mixins/chartjs';
import theme from './theme';

const DashboardApp = ({ data }) => (
  <ThemeProvider theme={theme}>
    <DashboardLayout>
      <Switch>
        <Route
          path='/profile'
          exact
          component={() => <Dashboard data={data} />}
        />
        <Route
          path='/profile/users'
          component={() => <UsersList data={data.clubs} />}
        />
        <Route
          path='/profile/clubs'
          component={() => <Clubs clubs={data.clubs} />}
        />
        <Route path='/profile/account' component={Account} />
      </Switch>
    </DashboardLayout>
  </ThemeProvider>
);
export default DashboardApp;

DashboardApp.propTypes = {
  data: PropTypes.shape({
    clubs: PropTypes.node.isRequired,
    events: PropTypes.node.isRequired,
    messages: PropTypes.node.isRequired,
  }),
};

DashboardApp.defaultProps = {
  data: {},
};
