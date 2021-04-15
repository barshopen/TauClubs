import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Messages from '../Components/Messages';
import MyClubs from '../Components/MyClubs';

function Home() {
  const [data, setData] = useState();

  useEffect(() => {
    fetch('https://mockend.com/barshopen/a/messages', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((mydata) => setData(mydata.slice(0, 7)));
  }, []);

  return (
    <>
      <Container>
        <ComponentContainer Flex="1">
          <Messages data={data} />
        </ComponentContainer>
        <ComponentContainer Flex="2">
          <MyClubs />
        </ComponentContainer>

      </Container>
    </>
  );
}

export default Home;
const Container = styled.div`
    display:flex;
    flex-direction:row;
    width:100vw;
`;
const ComponentContainer = styled.div`
      flex:${(props) => props.Flex};
      padding: 0 10px;
`;
