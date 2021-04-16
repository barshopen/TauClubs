import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function GenericControl({ header, children, width }) {
  return (
    <>
      <MainHeader width={width}>
        {header}
      </MainHeader>

      {children}
    </>
  );
}

GenericControl.propTypes = {
  header: PropTypes.string.isRequired,
  children: PropTypes.element,
  width: PropTypes.string,
};

GenericControl.defaultProps = {
  children: [],
  width: '100%',
};

const MainHeader = styled.h2`
    font-family: 'Roboto Condensed', sans-serif;
    font-size:28rem;
    font-weight: normal;
    width:${(props) => props.width};
`;

export default GenericControl;
