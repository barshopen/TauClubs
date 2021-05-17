import React from 'react';

import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
} from '@material-ui/core';
import { indigo, red } from '@material-ui/core/colors';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { makeStyles } from '@material-ui/core/styles';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const useStyles = makeStyles(() => ({
  root: {
    height: '160px',
  },
}));

const TotalEvents = props => {
  const classes = useStyles();
  const precentage = '12%';

  return (
    <Card style={{ height: '100%', position: 'relative' }} {...props}>
      <CardContent className={classes.root}>
        <Grid container spacing={3} style={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color='textSecondary' gutterBottom variant='h6'>
              TOTAL EVENTS
            </Typography>
            <Typography color='textPrimary' variant='h3'>
              15
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              style={{
                backgroundColor: indigo[600],
                height: 56,
                width: 56,
              }}>
              <AttachMoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          position='absolute'
          bottom='25px'
          display='flex'
          alignItems='center'>
          <ArrowDownwardIcon style={{ color: red[900] }} />
          <Typography
            style={{
              color: red[900],
              mr: 1,
            }}
            variant='body2'>
            {precentage}
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
export default TotalEvents;
