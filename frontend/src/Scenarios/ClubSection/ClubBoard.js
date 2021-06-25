import React from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import EventIcon from '@material-ui/icons/Event';
import MessageIcon from '@material-ui/icons/Message';
import Grid from '@material-ui/core/Grid';
import { Box } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import Messages from '../../Components/Messages';
import NewMessageModal from '../NewMessageModal';
import NewEventModal from '../NewEventModal';
import useClubFeed from '../../hooks/useClubFeed';

const IconBu = ({ ariaLabel, onClick }) => (
  <IconButton color='inherit' aria-label={ariaLabel} onClick={onClick}>
    <MessageIcon />
  </IconButton>
);
IconBu.propTypes = {
  ariaLabel: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};
IconBu.defaultProps = {
  ariaLabel: '',
};

const AddEventIcon = ({ ariaLabel, onClick }) => (
  <IconButton color='inherit' aria-label={ariaLabel} onClick={onClick}>
    <EventIcon />
  </IconButton>
);
AddEventIcon.propTypes = {
  ariaLabel: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};
AddEventIcon.defaultProps = {
  ariaLabel: '',
};

const ClubBoard = ({ currentUserIsClubsAdmin = false }) => {
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
              <Tooltip title='New Message' placement='top'>
                <Box padding='10%' paddingTop='1%' paddingBottom='2%'>
                  <NewMessageModal
                    ClickableTrigger={IconBu}
                    addMessage={addMessage}
                  />
                </Box>
              </Tooltip>
              <Tooltip title='New Event' placement='top'>
                <Box padding='10%' paddingTop='1%' paddingBottom='2%'>
                  <NewEventModal
                    ClickableTrigger={AddEventIcon}
                    addEvent={addEvent}
                  />
                </Box>
              </Tooltip>
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
          messagesData &&
          upcomingEvents && (
            <>
              <Messages
                data={messagesData?.concat(upcomingEvents)}
                isAdmin={currentUserIsClubsAdmin}
              />
            </>
          )
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
