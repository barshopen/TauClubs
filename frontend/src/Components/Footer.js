import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import GenericModal from './Generic/GenericModal';

const Container = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  flex-direction: column;
  justify-content: center;

  margin: 0 auto;
  background: black;

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
  color: #fff;
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

const Input = styled.input`
  height: ${props => props.height};
  font-family: 'Roboto';
  height: '30px';
`;
const TextArea = styled.textarea`
  height: '120px';
  font-family: 'Roboto';
`;

const ModalContainer = styled.div.attrs(() => {
  'modalContainr';
})`
  display: flex;
  position: unset;
  flex-direction: column;
  justify-content: space-evenly;
`;

const Footer = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Container>
        <Row>
          <Column>
            <Heading onClick={() => setOpen(prev => !prev)}>About Us</Heading>
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
        showModal={open}
        setShowModal={setOpen}
        Container={ModalContainer}
        hideButtons>
        <Header>About Us</Header>
        <div> gdgfgdf </div>
      </GenericModal>
    </>
  );
};
export default Footer;
