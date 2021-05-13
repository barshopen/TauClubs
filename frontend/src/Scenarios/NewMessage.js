import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
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
const Line = styled.div`
  display: flex;
  justify-content: space-around;
`;

function GenericContainer({ setOpen }) {
  return (
    <Container>
      <Header>Publish New Message</Header>
      <Input height='30px' type='text' placeholder='Message title' />
      <TextArea placeholder='Message' style={{ height: '140px' }} />
      <Line>
        <Button
          variant='contained'
          color='primary'
          onClick={() => setOpen(false)}>
          Create
        </Button>
        <Button variant='contained' onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </Line>
    </Container>
  );
}

function NewMessage({ ClickableTrigger }) {
  return (
    <GenericModal
      ClickableTrigger={ClickableTrigger}
      Content={GenericContainer}
    />
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
