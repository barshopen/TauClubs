import React from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import DashboardLayout from './components/DashboardLayout';
import Account from '../../User/Account';
import CustomerList from './pages/CustomerList';
import Dashboard from './pages/Dashboard';
import ProductList from './pages/ProductList';
import Settings from './pages/Settings';
import GlobalStyles from './components/GlobalStyles';
import './mixins/chartjs';
import theme from './theme';

const DashboardApp = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <DashboardLayout>
      <Switch>
        <Route path='/profile' exact component={Dashboard} />
        <Route path='/profile/customers' component={CustomerList} />/
        <Route path='/profile/dashboard' component={Dashboard} />
        <Route path='/profile/products' component={ProductList} />
        <Route path='/profile/account' component={Account} />
        <Route path='/profile/settings' component={Settings} />
      </Switch>
    </DashboardLayout>
  </ThemeProvider>
);

export default DashboardApp;
