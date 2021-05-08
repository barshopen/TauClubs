import React from 'react';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import FeedCard from '../Components/Feed/GenericFeedCard';

const ComponentContainer = styled.div`
  grid-area: ${props => props.gridArea};
`;

function Home() {
  return (
    <>
      <Container maxWidth='md'>
        <ComponentContainer gridArea='feed'>
          <FeedCard />
        </ComponentContainer>
      </Container>
    </>
  );
}

export default Home;
