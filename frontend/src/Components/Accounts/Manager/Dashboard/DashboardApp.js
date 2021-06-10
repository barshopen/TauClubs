import React, { useState, useEffect } from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import { useQuery } from 'react-query';
import DashboardLayout from './components/DashboardLayout';
import Account from '../../User/Account';
import UsersList from './pages/UsersList';
import Dashboard from './pages/Dashboard';
import Clubs from './pages/Clubs';
// import Settings from './pages/Settings';
import './mixins/chartjs';
import theme from './theme';
import { getDashboardData } from '../../../../Shared/api';

const DashboardApp = () => {
  // const storeKey = ['dashboardData'];
  // const { data: dashboardData } = useQuery(storeKey, getDashboardData);
  // const dashboardData = getDashboardData();

  const [dashboardData, setDashboardData] = useState(false);
  useEffect(async () => {
    const res = await getDashboardData();
    setDashboardData(res);
  }, []);

  // const mockupData = {
  //   clubs: {
  //     chess: {
  //       lastUpdate: 'Wed, 02 Jun 2021 17:54:00 GMT',
  //       users: [
  //         {
  //           contactMail: 'bar.shopen@gmail.com',
  //           id: '609c1f691bd313d95dc44608',
  //           joinTime: '2021-05-12T18:33:13+00:00',
  //           name: 'Bar Shopen',
  //           picture:
  //             'https://lh3.googleusercontent.com/a/AATXAJzWt5OkP4YW7kOCQZ9vap9Y2ay_8EYEdylcgD-G=s96-c',
  //         },
  //         {
  //           contactMail: 'avitalhaiman@mail.tau.ac.il',
  //           id: '60a2be2ae40060187c1bc6c1',
  //           joinTime: '2021-05-17T19:04:10+00:00',
  //           name: 'Avital Haiman',
  //           picture:
  //             'https://lh3.googleusercontent.com/a/AATXAJz_NrN5D6Ci81m4Z8oc1wm353zpjGiQmlymXkCf=s96-c',
  //         },
  //         {
  //           contactMail: 'tauclubs2021@gmail.com',
  //           id: '60a93a09ca96339d120105b9',
  //           joinTime: '2021-05-22T17:06:17+00:00',
  //           name: 'TAU Clubs',
  //           picture:
  //             'https://lh3.googleusercontent.com/a/AATXAJyh9z-SuWe3cmGr-SiIfsKznQ__XUZ4T6CBrU-G=s96-c',
  //         },
  //       ],
  //       usersByDated: {
  //         1: 8,
  //         2: 9,
  //         3: 4,
  //         4: 8,
  //         5: 3,
  //         6: 9,
  //       },
  //       club: {
  //         admin: true,
  //         contactMail: 'chessAtTau@gmail.com',
  //         creationTime: '2021-05-10T03:43:44+00:00',
  //         description:
  //           'the chess club offers you an oppertunity to level up your skills and practice with fellow students',
  //         id: '6098abf05f5ae43d1a66ada8',
  //         lastUpdateTime: '2021-06-02T17:54:00.584000',
  //         membersCount: 12,
  //         name: 'chessaa',
  //         name_of_tags: [
  //           {
  //             color: 0,
  //             id: '609f7e9269915dc4a908a390',
  //             name: 'fun',
  //           },
  //         ],
  //         profileImage: 'images/chessProfile.jpeg',
  //       },
  //     },
  //     chessa: {
  //       lastUpdate: 'Wed, 02 Jun 2021 17:54:00 GMT',
  //       users: [
  //         {
  //           contactMail: 'bar.shopen@gmail.com',
  //           id: '609c1f691bd313d95dc44608',
  //           joinTime: '2021-05-12T18:33:13+00:00',
  //           name: 'Bar Shopen',
  //           picture:
  //             'https://lh3.googleusercontent.com/a/AATXAJzWt5OkP4YW7kOCQZ9vap9Y2ay_8EYEdylcgD-G=s96-c',
  //         },
  //         {
  //           contactMail: 'avitalhaiman@mail.tau.ac.il',
  //           id: '60a2be2ae40060187c1bc6c1',
  //           joinTime: '2021-05-17T19:04:10+00:00',
  //           name: 'Avital Haiman',
  //           picture:
  //             'https://lh3.googleusercontent.com/a/AATXAJz_NrN5D6Ci81m4Z8oc1wm353zpjGiQmlymXkCf=s96-c',
  //         },
  //         {
  //           contactMail: 'tauclubs2021@gmail.com',
  //           id: '60a93a09ca96339d120105b9',
  //           joinTime: '2021-05-22T17:06:17+00:00',
  //           name: 'TAU Clubs',
  //           picture:
  //             'https://lh3.googleusercontent.com/a/AATXAJyh9z-SuWe3cmGr-SiIfsKznQ__XUZ4T6CBrU-G=s96-c',
  //         },
  //       ],
  //       usersByDated: {
  //         1: 2,
  //         2: 10,
  //         3: 12,
  //         4: 15,
  //         5: 4,
  //         6: 20,
  //       },
  //       club: {
  //         admin: true,
  //         contactMail: 'chessAtTau@gmail.com',
  //         creationTime: '2021-05-10T03:43:44+00:00',
  //         description:
  //           'the chess club offers you an oppertunity to level up your skills and practice with fellow students',
  //         id: '6098abf05f5ae43d1a66ada8',
  //         lastUpdateTime: '2021-06-02T17:54:00.584000',
  //         membersCount: 12,
  //         name: 'chess',
  //         name_of_tags: [
  //           {
  //             color: 0,
  //             id: '609f7e9269915dc4a908a390',
  //             name: 'fun',
  //           },
  //         ],
  //         profileImage: 'images/chessProfile.jpeg',
  //       },
  //     },
  //   },
  //   events: {
  //     currentMonth: {
  //       month: 'June',
  //       total: 0,
  //     },
  //     lastMonth: {
  //       month: 'May',
  //       total: 0,
  //     },
  //   },
  //   messages: {
  //     currentMonth: {
  //       month: 'June',
  //       total: 22,
  //     },
  //     lastMonth: {
  //       month: 'May',
  //       total: 0,
  //     },
  //   },
  // };

  return (
    <ThemeProvider theme={theme}>
      <DashboardLayout>
        <Switch>
          <Route
            path='/profile'
            exact
            component={() => <Dashboard data={dashboardData} />}
          />
          <Route
            path='/profile/users'
            component={() => <UsersList data={dashboardData?.clubs} />}
          />
          <Route
            path='/profile/clubs'
            component={() => <Clubs clubs={dashboardData?.clubs} />}
          />
          <Route path='/profile/account' component={Account} />
        </Switch>
      </DashboardLayout>
    </ThemeProvider>
  );
};
export default DashboardApp;
