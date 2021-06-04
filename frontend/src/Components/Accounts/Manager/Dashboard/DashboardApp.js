import React from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import { useQuery } from 'react-query';
import DashboardLayout from './components/DashboardLayout';
import Account from '../../User/Account';
import UsersList from './pages/UsersList';
import Dashboard from './pages/Dashboard';
import Clubs from './pages/Clubs';
import Settings from './pages/Settings';
import './mixins/chartjs';
import theme from './theme';
import { getDashboardData } from '../../../../Shared/api';

const fetchDashboardData = async () => {
  const res = await getDashboardData();
  return res;
};

const DashboardApp = () => {
  const storeKey = ['dashboardData'];
  const { data } = useQuery(storeKey, fetchDashboardData);

  return (
    <ThemeProvider theme={theme}>
      <DashboardLayout>
        <Switch>
          <Route
            path='/profile'
            exact
            component={() => <Dashboard data={data} />}
          />
          <Route path='/profile/users' component={UsersList} />/
          <Route path='/profile/clubs' component={Clubs} />
          <Route path='/profile/account' component={Account} />
          <Route path='/profile/settings' component={Settings} />
        </Switch>
      </DashboardLayout>
    </ThemeProvider>
  );
};
export default DashboardApp;
