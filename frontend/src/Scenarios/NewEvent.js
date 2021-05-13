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
  height: '30px';
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
      <Header>Create New Event</Header>
      <Input type='text' placeholder='Event title' />
      <TextArea placeholder='Description' style={{ height: '140px' }} />
      <Input width='150px' type='date' />
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

function NewEvent({ ClickableTrigger }) {
  return (
    <GenericModal
      ClickableTrigger={ClickableTrigger}
      Content={GenericContainer}
    />
  );
}

NewEvent.propTypes = {
  ClickableTrigger: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.shape({ render: PropTypes.func.isRequired }),
  ]),
};

NewEvent.defaultProps = {
  ClickableTrigger: styled.div``, // a default container
};

export default NewEvent;
