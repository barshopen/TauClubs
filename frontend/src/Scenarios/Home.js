import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Messages from '../Components/Messages';
import ClubsView from '../Components/ClubsView';
import UpcomingEvents from '../Components/UpcomingEvents';

const width = '90%';

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
          <ClubsView header="My Clubs" width={width} data={clubsData} Container={ClubsViewContainer} />
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

const ClubsViewContainer = styled.div`
    display:grid;
    grid-template-columns:repeat(3, 1fr);
    grid-gap:10px;
`;

const Container = styled.div`
    display:grid;
    grid-template-columns:1fr 2fr;
    width:100%;
    grid-gap:10px;
`;
const ComponentContainer = styled.div`
      /* padding: 0 10px; */
`;
