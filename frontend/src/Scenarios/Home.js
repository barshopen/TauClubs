import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Messages from '../Components/Messages';
import ClubsView from '../Components/ClubsView';
import UpcomingEvents from '../Components/UpcomingEvents';
import { getMessages, getClubs, getUpcomingEvents } from '../api';

const width = '90%';

const ClubsViewContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
`;

const Container = styled.div`
  display: grid;
  grid-template-areas:
    'messages myClubs'
    'messages upcomingEvents';
  grid-template-columns: 1fr 2fr;
  grid-template-rows: auto;
  width: 100%;
  grid-gap: 10px;
`;

const ComponentContainer = styled.div`
  grid-area: ${props => props.gridArea};
`;

function Home() {
  const [messagesData, setMessagesData] = useState();
  const [clubsData, setClubsData] = useState();
  const [upcomingEvents, setUpcomingEvents] = useState();

  useEffect(() => {
    getMessages().then(mydata => setMessagesData(mydata.slice(0, 7)));

    getClubs().then(mydata => setClubsData(mydata.slice(0, 5)));

    getUpcomingEvents().then(mydata => setUpcomingEvents(mydata.slice(0, 5)));
  }, []);

  return (
    <>
      <Container>
        <ComponentContainer gridArea='messages'>
          <Messages data={messagesData} />
        </ComponentContainer>
        <ComponentContainer gridArea='myClubs'>
          <ClubsView
            header='My Clubs'
            width={width}
            data={clubsData}
            Container={ClubsViewContainer}
          />
        </ComponentContainer>
        <ComponentContainer>
          <div />
        </ComponentContainer>
        <ComponentContainer gridArea='upcomingEvents'>
          <UpcomingEvents data={upcomingEvents} />
        </ComponentContainer>
      </Container>
    </>
  );
}

export default Home;
