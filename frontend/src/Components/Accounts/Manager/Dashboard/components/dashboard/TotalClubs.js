/* eslint-disable react/prop-types */

import React from 'react';

import { Avatar, Card, CardContent, Grid, Typography } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';

const TotalUsers = ({ clubs }) => (
  <Card style={{ height: '100%', position: 'relative' }}>
    <CardContent>
      <Grid container spacing={3} style={{ justifyContent: 'space-between' }}>
        <Grid item>
          <Typography color='textSecondary' gutterBottom variant='h6'>
            TOTAL ClUBS
          </Typography>
          <Typography color='textPrimary' variant='h3'>
            {clubs?.length}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            style={{
              backgroundColor: green[600],
              position: 'absolute',
              right: '15px',
            }}>
            <PeopleIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default TotalUsers;
