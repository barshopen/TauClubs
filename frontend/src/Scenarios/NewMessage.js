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

function NewMessage({ showMessageModal, setShowMessageModal }) {
  return (
    <Modal
      ariaHideApp={false}
      isOpen={showMessageModal}
      onRequestClose={() => setShowMessageModal(false)}
      style={customStyles}
      contentLabel="Example Modal"
    >

      <h2>Hello</h2>
      <div>I am a modal</div>
      <form>
        <input type="text" />
      </form>
    </Modal>
  );
}

NewMessage.propTypes = {
  showMessageModal: PropTypes.bool.isRequired,
  setShowMessageModal: PropTypes.func.isRequired,
};
export default NewMessage;
