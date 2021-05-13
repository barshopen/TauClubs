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
import MoneyIcon from '@material-ui/icons/Money';
import { red } from '@material-ui/core/colors';

const Budget = props => (
  <Card style={{ height: '100%', position: 'relative' }} {...props}>
    <CardContent>
      <Grid container spacing={3} style={{ justifyContent: 'space-between' }}>
        <Grid item>
          <Typography color='textSecondary' gutterBottom variant='h6'>
            BUDGET
          </Typography>
          <Typography color='textPrimary' variant='h3'>
            $24,000
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            style={{
              backgroundColor: red[600],
            }}>
            <MoneyIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box position='absolute' bottom='25px' display='flex' alignItems='center'>
        <ArrowDownwardIcon style={{ color: red[900] }} />
        <Typography
          style={{
            color: red[900],
            mr: 1,
          }}
          variant='body2'>
          12%
        </Typography>
        <Typography color='textSecondary' variant='caption'>
          Since last month
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

export default Budget;
