import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '80%',
    margin: 20,
    backgroundColor: 'b',
  },
}));

const FeedNavBar = ({ setCurrentTab }) => (
  <Container>
    <Tabs>
      <Tab onClick={() => setCurrentTab('all')}> all </Tab>
      <Tab onClick={() => setCurrentTab('messages')}> messages </Tab>
      <Tab onClick={() => setCurrentTab('events')}> events </Tab>
    </Tabs>
  </Container>
);
export default FeedNavBar;
