import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import Messages from '../Components/Messages';
import UpcomingEvents from '../Components/UpcomingEvents';
import { getMessages, getUpcomingEvents } from '../api';

const ComponentContainer = styled.div`
  grid-area: ${props => props.gridArea};
`;

function Home() {
  const [messagesData, setMessagesData] = useState();
  const [upcomingEvents, setUpcomingEvents] = useState();

  useEffect(() => {
    getMessages().then(mydata => setMessagesData(mydata.slice(0, 7)));

    getUpcomingEvents().then(mydata => setUpcomingEvents(mydata.slice(0, 5)));
  }, []);

  return (
    <>
      <Container maxWidth='md'>
        <ComponentContainer gridArea='messages'>
          <Messages data={messagesData} />
        </ComponentContainer>
        <ComponentContainer gridArea='upcomingEvents'>
          <UpcomingEvents data={upcomingEvents} />
        </ComponentContainer>
      </Container>
    </>
  );
}

export default Home;
