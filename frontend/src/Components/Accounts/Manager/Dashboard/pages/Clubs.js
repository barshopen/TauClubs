import React from 'react';
import { Box, Container, Grid } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import ProductListToolbar from '../components/clubs/ClubsListToolbar';
import DashboardClubCard from '../components/clubs/DashboardClubCard';

const allUsersClubs = [
  {
    id: 'A1',
    createdAt: '27/03/2019',
    description:
      'Dropbox is a file hosting service that offers cloud storage, file synchronization, a personal cloud.',
    media: '/static/images/products/product_1.png',
    title: 'Dropbox',
    totalDownloads: '594',
  },
  {
    id: 'A2',
    createdAt: '31/03/2019',
    description:
      'Medium is an online publishing platform developed by Evan Williams, and launched in August 2012.',
    media: '/static/images/products/product_2.png',
    title: 'Medium Corporation',
    totalDownloads: '625',
  },
  {
    id: 'A2',
    createdAt: '31/03/2019',
    description:
      'Medium is an online publishing platform developed by Evan Williams, and launched in August 2012.',
    media: '/static/images/products/product_2.png',
    title: 'Medium Corporation',
    totalDownloads: '625',
  },
];

// const clubs = getAllClubsOfThisManager;

const Clubs = () => {
  const PAGE_SIZE = 5;
  const totalPages = Math.floor(allUsersClubs.length / PAGE_SIZE) + 1;

  return (
    <>
      <Box backgroundColor='background.default' minHeight='100%' py={3}>
        <Container maxWidth={false}>
          <ProductListToolbar />
          <Box pt={3}>
            <Grid container spacing={3}>
              {allUsersClubs.map(club => (
                <Grid item key={club.id} lg={4} md={6} xs={12}>
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
