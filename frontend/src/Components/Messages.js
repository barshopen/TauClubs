import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import GenericFeedMessage from './Generic/GenericFeedMessage';

// slice(0, 5) - backend sort from newest to oldest
function Messages({ data, isAdmin }) {
  return (
    <Container>
      {data.map(feedItem => (
        <GenericFeedMessage feedItem={feedItem} isAdmin={isAdmin} />
      ))}
    </Container>
  );
}

Messages.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
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

export default Messages;
