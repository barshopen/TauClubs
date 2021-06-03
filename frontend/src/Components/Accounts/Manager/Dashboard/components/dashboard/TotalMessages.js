/* eslint-disable react/prop-types */

import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@material-ui/core';
import React from 'react';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MessageIcon from '@material-ui/icons/Message';
import { red } from '@material-ui/core/colors';

const currentMonthLocation = 5;
const lastMonthLocation = 5;

const TotalMessages = ({ messages }) => {
  const precentage =
    (messages.currentMonthLocation / messages.lastMonthLocation) * 100;

  return (
    <Card style={{ height: '100%', position: 'relative' }}>
      <CardContent>
        <Grid container spacing={3} style={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color='textSecondary' gutterBottom variant='h6'>
              TOTAL MESSAGES
            </Typography>
            <Typography color='textPrimary' variant='h3'>
              {messages.currentMonthLocation}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              style={{
                backgroundColor: red[600],
              }}>
              <MessageIcon />
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

export default TotalMessages;
