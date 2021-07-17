import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container } from '@material-ui/core';
import UserListResults from '../components/user/UserListResults';

const UsersList = ({ data }) => {
  const allUsers = Object.values(data).map(({ users, club }) => ({
    users,
    club,
  }));

  return (
    <Box backgroundColor='background.default' minHeight='100%' py={3}>
      <Container style={{ padding: '0' }} maxWidth={false}>
        <Box pt={3}>
          <UserListResults users={allUsers} />
        </Box>
      </Container>
    </Box>
  );
};

export default UsersList;

UsersList.propTypes = {
  data: PropTypes.node,
};

UsersList.defaultProps = {
  data: {},
};
