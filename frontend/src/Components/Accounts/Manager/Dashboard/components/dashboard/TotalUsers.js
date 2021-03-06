import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@material-ui/core';
import { green, amber } from '@material-ui/core/colors';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';

const TotalUsers = ({ users }) => {
  const totalUsersInAllClubs = users?.length;

  return (
    <Card style={{ height: '100%', position: 'relative' }}>
      <CardContent>
        <Grid container spacing={3} style={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color='textSecondary' gutterBottom variant='h6'>
              TOTAL USERS
            </Typography>
            <Typography color='textPrimary' variant='h3'>
              {totalUsersInAllClubs}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              style={{
                backgroundColor: amber[600],
                position: 'absolute',
                right: '15px',
              }}>
              <PeopleIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          position='absolute'
          bottom='25px'
          display='flex'
          alignItems='center'>
          <ArrowUpwardIcon style={{ color: green[900] }} />
          <Typography
            variant='body2'
            style={{
              color: green[900],
              mr: 1,
            }}>
            16%
          </Typography>
          <Typography
            color='textSecondary'
            variant='caption'
            style={{ marginLeft: '10px' }}>
            Since last month
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TotalUsers;

TotalUsers.propTypes = {
  users: PropTypes.node,
};

TotalUsers.defaultProps = {
  users: {},
};
