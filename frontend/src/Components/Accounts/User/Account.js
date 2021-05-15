import React from 'react';

import { Box, Container, Grid } from '@material-ui/core';
import AccountProfile from './AccountProfile';
import AccountProfileDetails from './AccountProfileDetails';

const Account = () => (
  <>
    <Box backgroundColor='background.default' minHeight='100%' py={3}>
      <Container maxWidth='lg'>
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            <AccountProfile />
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <AccountProfileDetails />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default Account;
