import React from 'react';
import styled from 'styled-components';

function signin() {
  return (
    <>
      <Container>
        <ComponentContainer>
          <div>Name</div>
        </ComponentContainer>
      </Container>
    </>
  );
}

export default signin;
const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  width: 100%;
  grid-gap: 10px;
`;
const ComponentContainer = styled.div`
  /* padding: 0 10px; */
`;
