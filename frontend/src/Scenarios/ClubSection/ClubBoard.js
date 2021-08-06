import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useRouteMatch } from 'react-router-dom';
import BaseLoader from 'react-loader-spinner';
import Container from '@material-ui/core/Container';
import EventIcon from '@material-ui/icons/Event';
import MessageIcon from '@material-ui/icons/Message';
import Grid from '@material-ui/core/Grid';
import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Messages from '../../Components/Messages';
import NewMessageModal from '../NewMessageModal';
import NewEventModal from '../NewEventModal';
import useClubFeed from '../../hooks/useClubFeed';

const Loader = styled(BaseLoader)`
  margin-top: 25%;
  display: flex;
  justify-content: center;
`;

const IconBu = ({ ariaLabel, onClick }) => (
  <Button
    variant='contained'
    color='primary'
    aria-label={ariaLabel}
    onClick={onClick}
    startIcon={<MessageIcon />}
    size='Medium'>
    new message
  </Button>
);
IconBu.propTypes = {
  ariaLabel: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};
IconBu.defaultProps = {
  ariaLabel: '',
};

const AddEventIcon = ({ ariaLabel, onClick }) => (
  <Button
    variant='contained'
    color='primary'
    aria-label={ariaLabel}
    onClick={onClick}
    startIcon={<EventIcon />}
    size='Medium'>
    new event
  </Button>
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
              <Box padding='10%' paddingTop='1%' paddingBottom='2%'>
                <NewMessageModal
                  ClickableTrigger={IconBu}
                  handler={addMessage}
                  clubId={{
                    id: '',
                    title: '',
                    content: '',
                    titleStatus: 'Create New Message',
                  }}
                />
              </Box>
              <Box padding='10%' paddingTop='1%' paddingBottom='2%'>
                <NewEventModal
                  ClickableTrigger={AddEventIcon}
                  handler={addEvent}
                  clubId={{
                    id: '',
                    title: '',
                    description: '',
                    location: '',
                    titleStatus: 'Create New Event',
                  }}
                />
              </Box>
            </Grid>
          </>
        )}
      </Container>
      <Container>
        {loadingMessages || loadingEvents ? (
          <Loader type='TailSpin' color='#00BFFF' height={80} width={80} />
        ) : (
          messagesData &&
          upcomingEvents && (
            <>
              <Messages
                data={messagesData
                  ?.concat(upcomingEvents)
                  .sort(
                    (a, b) =>
                      new Date(...a.lastUpdateTime.split('/').reverse()) -
                      new Date(...b.lastUpdateTime.split('/').reverse())
                  )
                  .reverse()}
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
