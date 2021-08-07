/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import GenericFeedMessage from './Generic/GenericFeedMessage';

const Messages = ({ data, isAdmin, status }) => (
  <Container>
    {data.map((feedItem, index) => (
      <GenericFeedMessage
        key={index}
        feedItem={feedItem}
        isAdmin={isAdmin}
        status={status}
      />
    ))}
  </Container>
);

Messages.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
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
