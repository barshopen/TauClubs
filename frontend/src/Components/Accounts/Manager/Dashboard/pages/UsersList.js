import React from 'react';
import { Box, Container } from '@material-ui/core';
import UserListResults from '../components/customer/UserListResults';
import UserListToolbar from '../components/customer/UserListToolbar';

// TODO remove when backend is connected
const users = [
  {
    id: 1,
    address: {
      country: 'USA',
      state: 'West Virginia',
      city: 'Parkersburg',
      street: '2849 Fulton Street',
    },
    avatarUrl: '/static/images/avatars/avatar_3.png',
    createdAt: 1555016400000,
    email: 'ekaterina.tankova@devias.io',
    name: 'Ekaterina Tankova',
    phone: '304-428-3097',
    status: 'Member',
  },
  {
    id: 2,
    address: {
      country: 'USA',
      state: 'Bristow',
      city: 'Iowa',
      street: '1865  Pleasant Hill Road',
    },
    avatarUrl: '/static/images/avatars/avatar_4.png',
    createdAt: 1555016400000,
    email: 'cao.yu@devias.io',
    name: 'Cao Yu',
    phone: '712-351-5711',
    status: 'Pending',
  },
  {
    id: 3,
    address: {
      country: 'USA',
      state: 'Georgia',
      city: 'Atlanta',
      street: '4894  Lakeland Park Drive',
    },
    avatarUrl: '/static/images/avatars/avatar_2.png',
    createdAt: 1555016400000,
    email: 'alexa.richardson@devias.io',
    name: 'Alexa Richardson',
    phone: '770-635-2682',
    status: 'Member',
  },
  {
    id: 4,
    address: {
      country: 'USA',
      state: 'Ohio',
      city: 'Dover',
      street: '4158  Hedge Street',
    },
    avatarUrl: '/static/images/avatars/avatar_5.png',
    createdAt: 1554930000000,
    email: 'anje.keizer@devias.io',
    name: 'Anje Keizer',
    phone: '908-691-3242',
    status: 'Member',
  },
  {
    id: 5,
    address: {
      country: 'USA',
      state: 'Texas',
      city: 'Dallas',
      street: '75247',
    },
    avatarUrl: '/static/images/avatars/avatar_6.png',
    createdAt: 1554757200000,
    email: 'clarke.gillebert@devias.io',
    name: 'Clarke Gillebert',
    phone: '972-333-4106',
    status: 'Member',
  },
  {
    id: 6,
    address: {
      country: 'USA',
      state: 'California',
      city: 'Bakerfield',
      street: '317 Angus Road',
    },
    avatarUrl: '/static/images/avatars/avatar_1.png',
    createdAt: 1554670800000,
    email: 'adam.denisov@devias.io',
    name: 'Adam Denisov',
    phone: '858-602-3409',
    status: 'Pending',
  },
];

const UsersList = () => (
  <Box backgroundColor='background.default' minHeight='100%' py={3}>
    <Container style={{ padding: '0' }} maxWidth={false}>
      <UserListToolbar />
      <Box pt={3}>
        <UserListResults users={users} />
      </Box>
    </Container>
  </Box>
);

export default UsersList;
