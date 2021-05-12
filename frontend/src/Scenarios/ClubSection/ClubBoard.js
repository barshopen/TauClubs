import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouteMatch } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Proptypes from 'prop-types';
import Messages from '../../Components/Messages';
import UpcomingEvents from '../../Components/UpcomingEvents';
import NewMessage from '../NewMessage';
import NewEvent from '../NewEvent';
import { getMessages, getClubs, getUpcomingEvents } from '../../Shared/api';

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

function IconBu({ ariaLabel }) {
  return (
    <IconButton color='inherit' aria-label={ariaLabel}>
      <AddIcon />
    </IconButton>
  );
}

IconBu.propTypes = {
  ariaLabel: Proptypes.string,
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
    getClubs(clubId).then(mydata => setIsAdmin(mydata.admin));

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
          <NewMessage ClickableTrigger={IconBu} />
        </IconContainer>

        <div>
          <UpcomingEvents data={upcomingEvents} />
        </div>
        <IconContainer show={isAdmin}>
          <NewEvent ClickableTrigger={IconBu} />
        </IconContainer>
      </Container>
    </>
  );
}

export default ClubBoard;
