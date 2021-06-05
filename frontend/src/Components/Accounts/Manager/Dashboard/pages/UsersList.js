import React from 'react';
import { Box, Container } from '@material-ui/core';
import UserListResults from '../components/customer/UserListResults';
import UserListToolbar from '../components/customer/UserListToolbar';

const UsersList = ({ data }) => {
  const allUsers = Object.values(data).map(({ users, club }) => ({
    users,
    club: club.name,
  }));

  return (
    <Box backgroundColor='background.default' minHeight='100%' py={3}>
      <Container style={{ padding: '0' }} maxWidth={false}>
        <UserListToolbar />
        <Box pt={3}>
          <UserListResults users={allUsers} />
        </Box>
      </Container>
    </Box>
  );
};

export default UsersList;
