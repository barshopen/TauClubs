import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Messages from '../../Components/Messages';
import UpcomingEvents from '../../Components/UpcomingEvents';

function ClubBoard() {
  const [messagesData, setMessagesData] = useState();
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

    fetch('http://localhost:3030/upcoming_events', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((mydata) => setUpcomingEvents(mydata.slice(0, 7)));
  }, []);
  return (
    <>
      <Container>
        <ComponentContainer>
          <Messages data={messagesData} />
        </ComponentContainer>
        <ComponentContainer>
          <UpcomingEvents data={upcomingEvents} />
        </ComponentContainer>

      </Container>
    </>
  );
}

const Container = styled.div`
      display:grid;
      grid-template-columns:1fr 2fr;
      width:100%;
      grid-gap:10px;
  `;
const ComponentContainer = styled.div`
`;

export default ClubBoard;
