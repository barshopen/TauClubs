import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Messages from '../Components/Messages';
import MyClubs from '../Components/MyClubs';
import UpcomingEvents from '../Components/UpcomingEvents';

function Home() {
  const [messagesData, setMessagesData] = useState();
  const [clubsData, setClubsData] = useState();

  useEffect(() => {
    fetch('https://mockend.com/barshopen/tauclubs/messages', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((mydata) => setMessagesData(mydata.slice(0, 7)));

    fetch('https://mockend.com/barshopen/tauclubs/tree/mockend/clubs', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((mydata) => setClubsData(mydata.slice(0, 5)));
  }, []);

  return (
    <>
      <Container>
        <ComponentContainer>
          <Messages data={messagesData} />
        </ComponentContainer>
        <ComponentContainer>
          <MyClubs data={clubsData} />
        </ComponentContainer>
        <ComponentContainer>
          <div />
        </ComponentContainer>
        <ComponentContainer>
          <UpcomingEvents data={messagesData} />
        </ComponentContainer>

      </Container>
    </>
  );
}

export default Home;
const Container = styled.div`
    display:grid;
    grid-template-columns:1fr 2fr;
    width:100%;
    grid-gap:10px;
`;
const ComponentContainer = styled.div`
      /* padding: 0 10px; */
`;
