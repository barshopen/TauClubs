import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import GetAppIcon from '@material-ui/icons/GetApp';

const DashboardClubCard = ({ club }) => {
  const { club: clubData } = club;
  return (
    <Card
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}>
      <CardContent>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'center',

            pb: 3,
          }}>
          <Avatar
            alt='club'
            src={clubData.profileImage}
            variant='square'
            style={{ marginBottom: '10px' }}
          />
        </Box>
        <Typography
          align='center'
          color='textPrimary'
          gutterBottom
          variant='h4'>
          {clubData.name}
        </Typography>
        <Typography align='center' color='textPrimary' variant='body1'>
          {clubData.description}
        </Typography>
      </CardContent>
      <Box style={{ flexGrow: 1 }} />
      <Divider />
      <Box style={{ p: 2 }}>
        <Grid
          container
          spacing={2}
          style={{ justifyContent: 'space-between', padding: '10px' }}>
          <Grid
            item
            style={{
              alignItems: 'center',
              display: 'flex',
            }}>
            <AccessTimeIcon color='action' style={{ marginRight: '5px' }} />
            <Typography
              color='textSecondary'
              display='inline'
              style={{ pl: 1 }}
              variant='body2'>
              Updated {moment(clubData.creationTime).format('DD/MM/YYYY')}
            </Typography>
          </Grid>
          <Grid
            item
            style={{
              alignItems: 'center',
              display: 'flex',
            }}>
            <GetAppIcon color='action' style={{ marginRight: '5px' }} />
            <Typography
              color='textSecondary'
              display='inline'
              style={{ pl: 1 }}
              variant='body2'>
              {club.users.length} Users
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

DashboardClubCard.propTypes = {
  club: PropTypes.node.isRequired,
};

export default DashboardClubCard;
