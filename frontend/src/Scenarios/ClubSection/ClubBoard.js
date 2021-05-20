import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouteMatch } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import Messages from '../../Components/Messages';
import UpcomingEvents from '../../Components/UpcomingEvents';
import NewMessageModal from '../NewMessageModal';
import NewEventModal from '../NewEventModal';
<<<<<<< HEAD
import { getClubs } from '../../Shared/api';
import useClubFeed from '../../hooks/useClubFeed';
=======
import { getMessages, getClub, getUpcomingEvents } from '../../Shared/api';
>>>>>>> a67580a66acae71b1badbd2627354b726a544504

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

const ClubBoard = () => {
  const {
    params: { clubId },
  } = useRouteMatch('/club/*/:clubId');
  const [isAdmin, setIsAdmin] = useState();

  const {
    loadingMessages,
    messagesData,
    loadingEvents,
    upcomingEvents,
  } = useClubFeed({ clubId });

  useEffect(() => {
    getClubs(clubId).then(mydata => {
      setIsAdmin(mydata.admin);
    });
  }, [clubId]);
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
        <IconContainer show={isAdmin}>
          <NewMessageModal ClickableTrigger={IconBu} />
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
        <IconContainer show={isAdmin}>
          <NewEventModal ClickableTrigger={IconBu} />
        </IconContainer>
      </Container>
    </>
  );
};

export default ClubBoard;
