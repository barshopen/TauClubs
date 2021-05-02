import React, { useState } from 'react';
import styled from 'styled-components';
import { useTheme } from '@material-ui/core/styles';
import GenericModal from './Generic/GenericModal';

const Container = styled.footer`
  display: flex;
  position: relative;
  bottom: 0;
  flex-direction: column;
  justify-content: center;
  color: black;
  margin: 0 auto;
  background: #efefea;
  z-index: ${props => props.zIndex};
  width: 100%;
  height: 50px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  margin-left: 60px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  align-items: center;
  grid-gap: 20px;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
`;

const Heading = styled.p`
  font-size: 0.8rem;
  color: black;
  :hover {
    cursor: pointer;
  }
`;

const Header = styled.h2`
  text-align: center;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 1rem;
  font-weight: bold;
  padding-bottom: 20px;
`;

const ModalContainer = styled.div`
  display: flex;
  position: unset;
  flex-direction: column;
  justify-content: space-evenly;
`;

const Footer = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const theme = useTheme();
  return (
    <>
      <Container zIndex={theme.zIndex.drawer + 1}>
        <Row>
          <Column>
            <Heading onClick={() => setModalOpened(true)}>About Us</Heading>
          </Column>

          <Column>
            <Heading>Services</Heading>
          </Column>
          <Column>
            <Heading>Contact Us</Heading>
          </Column>
          <Column>
            <Heading>Contact Us</Heading>
          </Column>
        </Row>
      </Container>

      <GenericModal
        showModal={modalOpened}
        setShowModal={setModalOpened}
        Container={ModalContainer}
        hideButtons>
        <Header>About Us</Header>
        <div> Information To fill </div>
      </GenericModal>
    </>
  );
};
export default Footer;
