import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import styled from 'styled-components';

const customStyles = {
  content: {
    left: '33%',
    right: '33%',
    top: '20%',
    height: '56vh',

  },
};

function GenericModal({
  showModal, setShowModal, Title, Container, children,
}) {
  return (
    <Modal
      ariaHideApp={false}
      isOpen={showModal}
      onRequestClose={() => setShowModal(false)}
      style={customStyles}
      contentLabel={Title}
    >
      <Container>
        {children}
      </Container>
    </Modal>
  );
}

GenericModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  Title: PropTypes.string,
  children: PropTypes.node,
  Container: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.shape({ render: PropTypes.func.isRequired }),
  ]),
};

GenericModal.defaultProps = {
  Title: '',
  children: React.createElement('div'),
  Container: styled.div``, // a default container
};

export default GenericModal;
