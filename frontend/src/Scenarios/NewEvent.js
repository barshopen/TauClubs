// @flow
import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function NewEvent({ showEventModal, setShowEventModal }) {
  return (
    <Modal
      ariaHideApp={false}
      isOpen={showEventModal}
      onRequestClose={() => setShowEventModal(false)}
      style={customStyles}
      contentLabel="Example Modal"
    >

      <h2>Hello</h2>
      <div>I am a modal</div>
      <form>
        <input />
        <input type="text" />
      </form>
    </Modal>
  );
}

NewEvent.propTypes = {
  showEventModal: PropTypes.bool.isRequired,
  setShowEventModal: PropTypes.func.isRequired,
};
export default NewEvent;
