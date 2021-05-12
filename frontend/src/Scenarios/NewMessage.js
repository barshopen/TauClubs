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
  font-size: 1rem;
  font-weight: bold;
`;

const Input = styled.input`
  height: ${props => props.height};
  font-family: 'Roboto';
`;
const TextArea = styled.textarea`
  height: '120px';
  font-family: 'Roboto';
`;

function NewMessage({ ClickableTrigger }) {
  return (
    <GenericModal ClickableTrigger={ClickableTrigger}>
      <Container>
        <Header>Publish New Message</Header>
        <Input height='30px' type='text' placeholder='Message title' />
        <TextArea placeholder='Message' style={{ height: '140px' }} />
      </Container>
    </GenericModal>
  );
}

NewMessage.propTypes = {
  ClickableTrigger: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.shape({ render: PropTypes.func.isRequired }),
  ]),
};

NewMessage.defaultProps = {
  ClickableTrigger: styled.div``, // a default container
};
export default NewMessage;
