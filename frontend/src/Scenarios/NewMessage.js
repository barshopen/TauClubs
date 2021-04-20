import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GenericModal from '../Components/Generic/GenericModal';

const primary = '#3898EC';
const secondary = '#87898a';

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

const Button = styled.button`
  border: solid ${({ color }) => color} 1px;
  text-align: center;
  font-family: 'Roboto Condensed', sans-serif;
  font-size:15rem; font-weight: bold; color:white;
  width:75px; height:40px;
  background-color:  ${({ color }) => color};
  margin:30px 80px;
`;

const Line = styled.div`
  display:flex;
  justify-content: space-around;
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

      <Line>
        <Button
          color={primary}
          type="button"
          label="Publish"
          onClick={() => setShowMessageModal(false)} // TODO with actual submit
        >
          Publish
        </Button>
        <Button
          color={secondary}
          type="button"
          label="Cancel"
          onClick={() => setShowMessageModal(false)}

        >
          Cancel
        </Button>
      </Line>
    </GenericModal>
  );
}

NewMessage.propTypes = {
  showMessageModal: PropTypes.bool.isRequired,
  setShowMessageModal: PropTypes.func.isRequired,
};
export default NewMessage;
