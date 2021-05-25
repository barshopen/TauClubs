import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';

const FeedNavBar = ({ setCurrentTab }) => (
  <Container>
    <Tabs>
      <Tab onClick={() => setCurrentTab('all')}> all </Tab>
      <Tab onClick={() => setCurrentTab('messages')}> messages </Tab>
      <Tab onClick={() => setCurrentTab('events')}> events </Tab>
    </Tabs>
  </Container>
);

FeedNavBar.propTypes = {
  setCurrentTab: PropTypes.string,
};

FeedNavBar.defaultProps = {
  setCurrentTab: '',
};

export default FeedNavBar;
