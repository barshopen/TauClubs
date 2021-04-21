import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import styled from 'styled-components';

const primary = '#3898EC';
const secondary = '#87898a';

const customStyles = {
  content: {
    position: 'absolute',
    left: '33%',
    right: '33%',
    top: '20%',
    height: '56vh',

  },
};

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

        <Line>
          <Button
            color={primary}
            type="button"
            label="Create"
            onClick={() => setShowModal(false)}
          >
            Publish
          </Button>
          <Button
            color={secondary}
            type="button"
            label="Cancel"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </Button>

        </Line>
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
