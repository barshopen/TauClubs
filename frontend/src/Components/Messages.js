import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import GenericControl from './Generic/GenericControl';
import GenericFeedMessage from './Generic/GenericFeedMessage';

// slice(0, 5) - backend sort from newest to oldest
function Messages({ data }) {
  return (
    <GenericControl header='Messages'>
      <MessagesContainer>
        {data.map(({ clubId, id, title, date, content }) => (
          <GenericFeedMessage
            clubId={clubId}
            id={id}
            title={title}
            date={date}
            key={id}>
            <Content>{content}</Content>
          </GenericFeedMessage>
        ))}
      </MessagesContainer>
    </GenericControl>
  );
}

Messages.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      date: PropTypes.string,
      text: PropTypes.string,
    })
  ),
};

Messages.defaultProps = {
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
`;

export default Messages;
