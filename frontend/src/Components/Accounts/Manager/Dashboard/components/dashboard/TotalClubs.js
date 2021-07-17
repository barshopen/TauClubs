import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Card, CardContent, Grid, Typography } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import AppsIcon from '@material-ui/icons/Apps';

const TotalClubs = ({ clubs }) => (
  <Card style={{ height: '100%', position: 'relative', paddingBottom: '50px' }}>
    <CardContent>
      <Grid container spacing={3} style={{ justifyContent: 'space-between' }}>
        <Grid item>
          <Typography color='textSecondary' gutterBottom variant='h6'>
            TOTAL ClUBS
          </Typography>
          <Typography color='textPrimary' variant='h3'>
            {Object.keys(clubs).length || 0}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            style={{
              backgroundColor: green[600],
              position: 'absolute',
              right: '15px',
            }}>
            <AppsIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default TotalClubs;

TotalClubs.propTypes = {
  clubs: PropTypes.shape({}),
};

TotalClubs.defaultProps = {
  clubs: {},
};
