import React from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import GenericModal from '../Components/Generic/GenericModal';

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 50vh;
`;

function ClickableTrigger({ onClick }) {
  return (
    <Button color='primary' variant='contained' onClick={onClick}>
      Contact Us
    </Button>
  );
}

ClickableTrigger.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default function ContactUsModal() {
  return (
    <GenericModal
      ClickableTrigger={ClickableTrigger}
      Content={ModalContainer}
    />
  );
}
