import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Grid } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import DashboardClubCard from '../components/clubs/DashboardClubCard';

const Clubs = ({ clubs }) => {
  const PAGE_SIZE = 10;
  const totalPages = Math.floor(Object.keys(clubs).length / PAGE_SIZE) + 1;

  return (
    <>
      <Box backgroundColor='background.default' minHeight='100%' py={3}>
        <Container maxWidth={false}>
          <Box pt={3}>
            <Grid container spacing={3}>
              {Object.values(clubs).map(club => (
                <Grid item lg={4} md={6} xs={12}>
                  <DashboardClubCard club={club} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box display='flex' justifyContent='center' pt={3}>
            <Pagination color='primary' count={totalPages} size='small' />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Clubs;

Clubs.propTypes = {
  clubs: PropTypes.node,
};

Clubs.defaultProps = {
  clubs: {},
};
