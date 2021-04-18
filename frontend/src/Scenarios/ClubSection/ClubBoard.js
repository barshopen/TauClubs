import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Messages from '../../Components/Messages';
import UpcomingEvents from '../../Components/UpcomingEvents';

function ClubBoard(props) {
  const [messagesData, setMessagesData] = useState();

  useEffect(() => {
    fetch('https://mockend.com/barshopen/tauclubs/messages', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((mydata) => setMessagesData(mydata.slice(0, 7)));
  }, []);
  return (
    <>
      <Container>
        <ComponentContainer>
          <Messages data={messagesData} />
        </ComponentContainer>
        <ComponentContainer>
          <UpcomingEvents data={messagesData} />
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
