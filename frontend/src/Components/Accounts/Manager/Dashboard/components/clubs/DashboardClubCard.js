import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useQueryClient } from 'react-query';
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
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import {
  deleteClub,
  editClub as editClubApi,
} from '../../../../../../Shared/api';
import DeleteConfirmationModal from '../../../../../../Scenarios/DeleteConfirmationModal';
import NewClubModal from '../../../../../../Scenarios/NewClubModal';

function ClickableTrigger({ onClick }) {
  return (
    <IconButton onClick={onClick}>
      <Tooltip title='Edit'>
        <EditIcon fontSize='large' />
      </Tooltip>
    </IconButton>
  );
}

ClickableTrigger.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const DashboardClubCard = ({ clubData }) => {
  const { club } = clubData;
  const queryClient = useQueryClient();

  const refetchDashboard = () => {
    setTimeout(() => queryClient.invalidateQueries(['dashboardData']), 2000);
    queryClient.invalidateQueries(['myClubs']);
  };

  const deleteHandler = clubId => {
    deleteClub({ payload: { clubId } });
    refetchDashboard();
  };

  const editClubHandler = data => {
    data.append('clubId', club?.id);
    editClubApi(data);
  };

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
            justifyContent: 'space-between',
            pb: 3,
          }}>
          <NewClubModal
            ClickableTrigger={ClickableTrigger}
            handler={editClubHandler}
            refetch={refetchDashboard}
            clubId={{
              id: club?.id,
              name: club?.name,
              description: club?.description,
              contact: club?.contactMail,
              title: 'Edit Club',
              isImage: club?.profileImage,
              existTag: club?.tags,
              FacebookGroup: club?.FacebookGroup,
              WhatsAppGroup: club?.WhatsAppGroup,
              officialWeb: club?.officialWeb,
            }}
          />
          <Avatar
            alt={club.name}
            src={`${window.origin}/db/images/${club?.id}`}
            variant='circle'
            style={{ height: '70px', width: '70px', marginBottom: '10px' }}
          />

          <DeleteConfirmationModal
            id={club?.id}
            deleteHandler={deleteHandler}
          />
        </Box>

        <Typography
          align='center'
          color='textPrimary'
          gutterBottom
          variant='h4'>
          {club.name}
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
              Last Updated {moment(club.lastUpdateTime).format('DD/MM/YYYY')}
            </Typography>
          </Grid>
          <Grid
            item
            style={{
              alignItems: 'center',
              display: 'flex',
            }}>
            <PeopleAltIcon color='action' style={{ marginRight: '5px' }} />
            <Typography
              color='textSecondary'
              display='inline'
              style={{ pl: 1 }}
              variant='body2'>
              {club.membersCount} Users
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};
DashboardClubCard.propTypes = {
  clubData: PropTypes.node.isRequired,
};
export default DashboardClubCard;
