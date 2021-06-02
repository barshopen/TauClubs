import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useRouteMatch } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Messages from '../../Components/Messages';
import UpcomingEvents from '../../Components/UpcomingEvents';
import NewMessageModal from '../NewMessageModal';
import NewEventModal from '../NewEventModal';
import useClubFeed from '../../hooks/useClubFeed';

const Container = styled.div`
  display: grid;
  grid-template-columns: 10fr 1fr 20fr 1fr;
  width: 100%;
  grid-gap: 10px;
`;

const IconContainer = styled.div`
  & div {
    /* TODO change this. find a better way to do it. */
    position: relative;
    top: 30px;
    right: 90px;
    cursor: pointer;
  }
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
`;

const IconBu = ({ ariaLabel, onClick }) => (
  <IconButton color='inherit' aria-label={ariaLabel} onClick={onClick}>
    <AddIcon />
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
    <>
      <Container>
        <div>
          {loadingMessages ? (
            <Loader
              type='TailSpin'
              color='#00BFFF'
              height={50}
              alignItems='center'
              width={50}
            />
          ) : (
            <Messages data={messagesData} />
          )}
        </div>
        <IconContainer show={currentUserIsClubsAdmin}>
          <NewMessageModal ClickableTrigger={IconBu} addMessage={addMessage} />
        </IconContainer>

        <div>
          {loadingEvents ? (
            <Loader
              type='TailSpin'
              color='#00BFFF'
              height={50}
              alignItems='center'
              width={50}
            />
          ) : (
            <UpcomingEvents data={upcomingEvents} />
          )}
        </div>
        <IconContainer show={currentUserIsClubsAdmin}>
          <NewEventModal ClickableTrigger={IconBu} addEvent={addEvent} />
        </IconContainer>
      </Container>
    </>
  );
};

export default ClubBoard;

ClubBoard.propTypes = {
  currentUserIsClubsAdmin: PropTypes.bool,
};

ClubBoard.defaultProps = {
  currentUserIsClubsAdmin: false,
};
