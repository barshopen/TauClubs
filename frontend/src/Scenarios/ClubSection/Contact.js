import React from 'react';
import styled from 'styled-components';

const photo =
  'https://uploads-ssl.webflow.com/605de9294593b646c3698f00/605de9294593b622b8698f1d_team1.jpg';
const ContainerOuter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const ContainerInner = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: 4fr 7fr;
  grid-template-rows: repeat(5, auto);
  max-width: 380px;
  grid-gap: 35px;
  grid-template-areas:
    'ph  h'
    'ph  t'
    'ph  .'
    'ph  e';
`;

const Header = styled.h2`
  text-align: justify;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 15px;
  font-weight: bold;
`;

const Text = styled.div`
  text-align: left;
  font-family: 'Roboto', sans-serif;
  font-size: 15px;
  grid-area: ${props => props.gridArea};
`;

const GridItem = styled.div`
  grid-area: ${props => props.gridArea};
`;
// TODO relocate
const data = {
  owner: 'Ben Mitchell',
  text:
    'Bar is well known chess teacher who won a gold medal at the TAU chess 1.',
  email: 'Jeramie_Zulauf@gmail.com',
};
function Contact() {
  return (
    <ContainerOuter>
      <ContainerInner>
        <GridItem gridArea='ph'>
          <img src={photo} width='150' alt='' />
        </GridItem>

        <GridItem gridArea='h'>
          <Header>{data.owner}</Header>
        </GridItem>

        <GridItem gridArea='t'>
          <Text gridArea='t'>{data.text}</Text>
        </GridItem>
        <GridItem gridArea='e'>
          <Text gridArea='e'>{data.email}</Text>
        </GridItem>
      </ContainerInner>
    </ContainerOuter>
  );
}

export default Contact;
