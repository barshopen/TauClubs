import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container1 = styled.div`
  width: ${props => props.width};
`;

function GenericControl({ header, children, width, Container }) {
  return (
    <>
      <MainHeader width={width}>{header}</MainHeader>
      <Container1 width={width} as={Container}>
        {children}
      </Container1>
    </>
  );
}

GenericControl.propTypes = {
  header: PropTypes.string.isRequired,
  children: PropTypes.node,
  width: PropTypes.string,
  Container: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.shape({ render: PropTypes.func.isRequired }),
  ]),
};

GenericControl.defaultProps = {
  Container: styled.div``, // a default container
  children: React.createElement('div'),
  width: '100%',
};

const MainHeader = styled.h2`
  text-align: center;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 15rem;
  margin: 25px 0;
  font-weight: normal;
  width: ${props => props.width};
`;

export default GenericControl;
