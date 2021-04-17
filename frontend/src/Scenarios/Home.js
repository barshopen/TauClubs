import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Messages from '../Components/Messages';
import MyClubs from '../Components/MyClubs';
import UpcomingEvents from '../Components/UpcomingEvents';

function Home() {
  const [messagesData, setMessagesData] = useState();
  const [clubsData, setClubsData] = useState();
  const [upcomingEvents, setUpcomingEvents] = useState();

  useEffect(() => {
    fetch('http://localhost:3030/messages', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((mydata) => setMessagesData(mydata.slice(0, 7)));

    fetch(' http://localhost:3030/clubs', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((mydata) => setClubsData(mydata.slice(0, 5)));

    fetch(' http://localhost:3030/upcoming_events', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((mydata) => setUpcomingEvents(mydata.slice(0, 5)));
  }, []);

  return (
    <>
      <Container>
        <ComponentContainer gridArea="messages">
          <Messages data={messagesData} />
        </ComponentContainer>
        <ComponentContainer gridArea="myClubs">
          <MyClubs data={clubsData} />
        </ComponentContainer>
        <ComponentContainer>
          <div />
        </ComponentContainer>
        <ComponentContainer gridArea="upcomingEvents">
          <UpcomingEvents data={upcomingEvents} />
        </ComponentContainer>

      </Container>
    </>
  );
}
const Container = styled.div`
    display:grid;
    grid-template-areas:
      "messages myClubs"
      "messages upcomingEvents";
    grid-template-columns:1fr 2fr;
    grid-template-rows: repeat(4, 1fr);
    width:100%;
    grid-gap:10px;
`;

const ComponentContainer = styled.div`
  grid-area: ${(props) => props.gridArea};

`;

export default Home;
