import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import GenericModal from '../Components/Generic/GenericModal';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 50vh;
`;

const Header = styled.h2`
  text-align: center;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 30rem;
  font-weight: bold;
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

function NewEvent({ showEventModal, setShowEventModal }) {
  return (
    <>
      <GenericModal
        showModal={showEventModal}
        setShowModal={setShowEventModal}
        Container={Container}>
        <Header>Create New Event</Header>
        <Input type='text' placeholder='Event title' />
        <TextArea placeholder='Description' style={{ height: '140px' }} />

        <Input width='150px' type='date' />
      </GenericModal>
    </>
  );
}

NewEvent.propTypes = {
  showEventModal: PropTypes.bool.isRequired,
  setShowEventModal: PropTypes.func.isRequired,
};
export default NewEvent;
