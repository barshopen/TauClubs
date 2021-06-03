import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ContainerOuter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const ContainerInner = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: 5fr 7fr;
  grid-template-rows: repeat(5, auto);
  max-width: 700px;
  grid-gap: 15px;
  grid-template-areas:
    'a  a  h'
    'a  a  t';
`;

const Header = styled.h2`
  text-align: justify;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 1rem;
  font-weight: bold;
`;

const Text = styled.div`
  text-align: left;
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  grid-area: ${props => props.gridArea};
`;

const GridItem = styled.div`
  grid-area: ${props => props.gridArea};
`;

const AboutUs = ({ description, contactMail }) => (
  <ContainerOuter>
    <ContainerInner>
      <GridItem gridArea='a'>
        <Text gridArea='a'>{description}</Text>
      </GridItem>
      <GridItem gridArea='h'>
        <Header>For more information:</Header>
      </GridItem>
      <GridItem gridArea='t'>
        <Text gridArea='t'>{contactMail}</Text>
      </GridItem>
    </ContainerInner>
  </ContainerOuter>
);

AboutUs.propTypes = {
  description: PropTypes.string,
  contactMail: PropTypes.string,
};
AboutUs.defaultProps = { description: '', contactMail: '' };

export default AboutUs;
