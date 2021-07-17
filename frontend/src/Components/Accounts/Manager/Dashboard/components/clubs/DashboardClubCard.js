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
import GetAppIcon from '@material-ui/icons/GetApp';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import { deleteClub, editClub } from '../../../../../../Shared/api';
import DeleteConfirmationModal from '../../../../../../Scenarios/DeleteConfirmationModal';
import NewClubModal from '../../../../../../Scenarios/NewClubModal';
import useClub from '../../../../../../hooks/useClub';

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

const DashboardClubCard = ({ club }) => {
  const { club: clubData } = club;

  const { editClub: edit } = useClub(clubData.id);
  const queryClient = useQueryClient();

  const refetchDashboard = () => {
    queryClient.invalidateQueries(['dashboardData']);
  };

  function deleteHandler(clubId) {
    deleteClub({ payload: { clubId } });
    refetchDashboard();
  }

  function editClubHandler(data) {
    data.append('clubId', clubData?.id);
    edit(data);
  }

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
            clubId={{
              id: clubData?.id,
              name: clubData?.name,
              description: clubData?.description,
              contact: clubData?.contactMail,
              title: 'Edit Club',
              isImage: clubData?.profileImage,
              existTag: clubData?.tags,
            }}
          />
          <Avatar
            alt='club'
            src={`${window.origin}/db/images/${clubData?.id}`}
            variant='circle'
            style={{ height: '70px', width: '70px', marginBottom: '10px' }}
          />

          <DeleteConfirmationModal
            id={clubData?.id}
            deleteHandler={deleteHandler}
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
              Last Updated {moment(clubData.creationTime).format('DD/MM/YYYY')}
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
