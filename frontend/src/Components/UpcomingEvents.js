import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import GenericControl from './Generic/GenericControl';
import GenericFeedEvent from './Generic/GenericFeedEvent';

function UpcomingEvents({ data }) {
  return (
    <GenericControl header='Upcoming Events'>
      <MessagesContainer>
        {data.map(
          ({ id, clubId, title, isAttend, isInterested, startTime, text }) => (
            <GenericFeedEvent
              clubId={clubId}
              title={title}
              isAttend={isAttend}
              isInterested={isInterested}
              date={startTime}
              key={id}
              id={id}>
              <Content>{text}</Content>
              {/* <Link to='/#'> View Location</Link> */}
            </GenericFeedEvent>
          )
        )}
      </MessagesContainer>
    </GenericControl>
  );
}

UpcomingEvents.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      date: PropTypes.string,
      text: PropTypes.string,
    })
  ),
};

UpcomingEvents.defaultProps = {
  data: [],
};

// styled components
const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 15px;
`;

const Content = styled.div`
  font-size: 1rem;
  text-align: left;
  overflow-wrap: break-word;
`;

/*
const Link = styled(RouterLink)`
  font-size: 1rem;
  text-decoration: none;
  display: block;
  text-align: left;
`; */

export default UpcomingEvents;
