import React from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import DashboardLayout from './components/DashboardLayout';
import Account from '../../User/Account';
import UsersList from './pages/UsersList';
import Dashboard from './pages/Dashboard';
import Clubs from './pages/Clubs';
import Settings from './pages/Settings';
import './mixins/chartjs';
import theme from './theme';

const DashboardApp = () => (
  <ThemeProvider theme={theme}>
    <DashboardLayout>
      <Switch>
        <Route path='/profile' exact component={Dashboard} />
        <Route path='/profile/users' component={UsersList} />/
        <Route path='/profile/dashboard' component={Dashboard} />
        <Route path='/profile/clubs' component={Clubs} />
        <Route path='/profile/account' component={Account} />
        <Route path='/profile/settings' component={Settings} />
      </Switch>
    </DashboardLayout>
  </ThemeProvider>
);

export default DashboardApp;
