import React from 'react';
import { Box, Container } from '@material-ui/core';
import UserListResults from '../components/user/UserListResults';

const UsersList = users => (
  <Box backgroundColor='background.default' minHeight='100%' py={3}>
    <Container style={{ padding: '0' }} maxWidth={false}>
      <Box pt={3}>
        <UserListResults users={users} />
      </Box>
    </Container>
  </Box>
);

export default UsersList;
