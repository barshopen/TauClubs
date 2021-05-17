import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouteMatch } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import Messages from '../../Components/Messages';
import UpcomingEvents from '../../Components/UpcomingEvents';
import NewMessageModal from '../NewMessageModal';
import NewEventModal from '../NewEventModal';
import { getMessages, getClub, getUpcomingEvents } from '../../Shared/api';

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

function IconBu({ ariaLabel, onClick }) {
  return (
    <IconButton color='inherit' aria-label={ariaLabel} onClick={onClick}>
      <AddIcon />
    </IconButton>
  );
}

IconBu.propTypes = {
  ariaLabel: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};
IconBu.defaultProps = {
  ariaLabel: '',
};

function ClubBoard() {
  const [messagesData, setMessagesData] = useState();
  const [upcomingEvents, setUpcomingEvents] = useState();
  const {
    params: { clubId },
  } = useRouteMatch('/club/*/:clubId');
  const [isAdmin, setIsAdmin] = useState();

  useEffect(() => {
    getClub(clubId).then(mydata => setIsAdmin(mydata.admin));

    getMessages().then(mydata => setMessagesData(mydata.slice(0, 7)));

    getUpcomingEvents().then(mydata => setUpcomingEvents(mydata.slice(0, 7)));
  }, [clubId]);
  return (
    <>
      <Container>
        <div>
          <Messages data={messagesData} />
        </div>
        <IconContainer show={isAdmin}>
          <NewMessageModal ClickableTrigger={IconBu} />
        </IconContainer>

        <div>
          <UpcomingEvents data={upcomingEvents} />
        </div>
        <IconContainer show={isAdmin}>
          <NewEventModal ClickableTrigger={IconBu} />
        </IconContainer>
      </Container>
    </>
  );
}

export default ClubBoard;
