import React, { useState, useEffect, makeStyles } from 'react';
import Container from '@material-ui/core/Container';
import styled from 'styled-components';
import { useRouteMatch } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import Messages from '../../Components/Messages';
import UpcomingEvents from '../../Components/UpcomingEvents';
import NewMessageModal from '../NewMessageModal';
import NewEventModal from '../NewEventModal';
import FeedCard from '../../Components/Feed/GenericFeedCard';
import { getMessages, getClubs, getUpcomingEvents } from '../../Shared/api';

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
    getClubs(clubId).then(mydata => setIsAdmin(mydata.admin));

    getMessages().then(mydata => setMessagesData(mydata.slice(0, 7)));

    getUpcomingEvents().then(mydata => setUpcomingEvents(mydata.slice(0, 7)));
  }, [clubId]);
  return (
    <Container>
      {messagesData?.map(feedItem => (
        <FeedCard feedItem={feedItem} />
      ))}
      {upcomingEvents?.map(feedItem => (
        <FeedCard feedItem={feedItem} />
      ))}
    </Container>
  );
}

export default ClubBoard;
