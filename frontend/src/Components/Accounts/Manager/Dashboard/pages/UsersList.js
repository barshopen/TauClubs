import React from 'react';
import { Box, Container } from '@material-ui/core';
import PropTypes from 'prop-types';
import UserListResults from '../components/user/UserListResults';

const UsersList = ({ data }) => (
  <Box backgroundColor='background.default' minHeight='100%' py={3}>
    <Container style={{ padding: '0' }} maxWidth={false}>
      <Box pt={3}>
        <UserListResults users={data.users} />
      </Box>
    </Container>
  </Box>
);

UsersList.propTypes = {
  data: PropTypes.node.isRequired,
};

export default UsersList;
