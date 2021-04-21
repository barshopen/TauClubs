import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import GenericModal from '../Components/Generic/GenericModal';

const Container = styled.div`
  display:flex;
  flex-direction:column;
  justify-content: space-evenly;
  height: 50vh;
`;

const Header = styled.h2`
  text-align: center;
  font-family: 'Roboto Condensed', sans-serif;
  font-size:30rem;
  font-weight: bold;
`;

const Input = styled.input`
  height:${(props) => props.height};
  font-family:'Roboto';
  height:'30px';
`;
const TextArea = styled.textarea`
  height: '120px';  
  font-family:'Roboto';
`;

function NewClub({ showModal, setClubModal }) {
  return (
    <>
      <GenericModal
        showModal={showModal}
        setShowModal={setClubModal}
        Container={Container}
      >
        <Header>
          Create New Club
        </Header>

        <Input type="text" placeholder="Club Name" />
        <TextArea placeholder="Description of club" style={{ height: '140px' }} />
        <Input type="text" placeholder="Contact Email" />

      </GenericModal>
    </>
  );
}

NewClub.propTypes = {
  showModal: propTypes.bool.isRequired,
  setClubModal: propTypes.func.isRequired,
};

export default NewClub;
