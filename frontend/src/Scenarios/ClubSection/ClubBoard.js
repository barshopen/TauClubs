import React from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import EventIcon from '@material-ui/icons/Event';
import MessageIcon from '@material-ui/icons/Message';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import Messages from '../../Components/Messages';
import UpcomingEvents from '../../Components/UpcomingEvents';
import NewMessageModal from '../NewMessageModal';
import NewEventModal from '../NewEventModal';
import useClubFeed from '../../hooks/useClubFeed';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  })
);

const IconBu = ({ ariaLabel, onClick }) => (
  <IconButton color='inherit' aria-label={ariaLabel} onClick={onClick}>
    <MessageIcon />
  </IconButton>
);

const AddEventIcon = ({ ariaLabel, onClick }) => (
  <IconButton color='inherit' aria-label={ariaLabel} onClick={onClick}>
    <EventIcon />
  </IconButton>
);

IconBu.propTypes = {
  ariaLabel: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};
IconBu.defaultProps = {
  ariaLabel: '',
};

const ClubBoard = ({ currentUserIsClubsAdmin = false }) => {
  const classes = useStyles();
  const {
    params: { clubId },
  } = useRouteMatch('/club/*/:clubId');

  const {
    loadingMessages,
    messagesData,
    loadingEvents,
    upcomingEvents,
    addMessage,
    addEvent,
  } = useClubFeed({ clubId });

  return (
    <Container>
      <Container>
        {currentUserIsClubsAdmin && (
          <>
            <Grid container justify='center' spacing={2}>
              <Box padding='10%' paddingTop='1%' paddingBottom='2%'>
                <NewMessageModal
                  ClickableTrigger={IconBu}
                  addMessage={addMessage}
                />
              </Box>
              <Box padding='10%' paddingTop='1%' paddingBottom='2%'>
                <NewEventModal
                  ClickableTrigger={AddEventIcon}
                  addEvent={addEvent}
                />
              </Box>
            </Grid>
          </>
        )}
      </Container>
      <Container>
        {loadingMessages || loadingEvents ? (
          <Loader
            type='TailSpin'
            color='#00BFFF'
            height={50}
            alignItems='center'
            width={50}
          />
        ) : (
          <>
            <Messages data={messagesData?.concat(upcomingEvents)} />
          </>
        )}
      </Container>
    </Container>
  );
};

export default ClubBoard;

ClubBoard.propTypes = {
  currentUserIsClubsAdmin: PropTypes.bool,
};

ClubBoard.defaultProps = {
  currentUserIsClubsAdmin: false,
};
