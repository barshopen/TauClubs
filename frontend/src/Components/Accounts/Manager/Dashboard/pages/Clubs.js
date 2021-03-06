import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Grid, Typography } from '@material-ui/core';
import DashboardClubCard from '../components/clubs/DashboardClubCard';

const Clubs = ({ clubs }) => (
  <Box backgroundColor='background.default' minHeight='100%' py={3}>
    <Container maxWidth={false}>
      <Box pt={3}>
        <Typography variant='h2' style={{ marginBottom: '30px' }}>
          Clubs
        </Typography>
        <Grid container spacing={3}>
          {Object.values(clubs).map(club => (
            <Grid item lg={4} md={6} xs={12}>
              <DashboardClubCard clubData={club} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  </Box>
);

export default Clubs;

Clubs.propTypes = {
  clubs: PropTypes.node,
};

Clubs.defaultProps = {
  clubs: {},
};
