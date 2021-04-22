import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
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
`;
const TextArea = styled.textarea`
  height: '120px';  
  font-family:'Roboto';
`;

function NewMessage({ showMessageModal, setShowMessageModal }) {
  return (
    <GenericModal
      showModal={showMessageModal}
      setShowModal={setShowMessageModal}
      Container={Container}
    >
      <Header>
        Publish New Message
      </Header>
      <Input height="30px" type="text" placeholder="Message title" />
      <TextArea placeholder="Message" style={{ height: '140px' }} />

    </GenericModal>
  );
}

NewMessage.propTypes = {
  showMessageModal: PropTypes.bool.isRequired,
  setShowMessageModal: PropTypes.func.isRequired,
};
export default NewMessage;
