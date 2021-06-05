import React, { useState, useEffect } from 'react';
import { Box, Container, Grid } from '@material-ui/core';
import TotalMessages from '../components/dashboard/TotalMessages';
import LatestJoinedUsers from '../components/dashboard/LatestJoinedUsers';
import ClubsActivity from '../components/dashboard/ClubsActivity';
import TotalClubs from '../components/dashboard/TotalClubs';
import TotalUsers from '../components/dashboard/TotalUsers';
import TotalEvents from '../components/dashboard/TotalEvents';

const Dashboard = ({ data }) => {
  const { clubs, events, messages } = data || {};

  const allUsers = Object.values(clubs).map(({ users, club }) => ({
    users,
    club: club.name,
  }));

  return (
    <Box backgroundColor='background.default' minHeight='100%' py={3}>
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalClubs clubs={clubs} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalMessages messages={messages} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalEvents events={events} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalUsers clubs={clubs} />
          </Grid>
          <Grid item lg={12} md={12} xl={9} xs={12}>
            <ClubsActivity clubs={clubs} />
          </Grid>
          <Grid item lg={12} md={12} xl={9} xs={12}>
            <LatestJoinedUsers allUsers={allUsers} style={{ width: '100%' }} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
