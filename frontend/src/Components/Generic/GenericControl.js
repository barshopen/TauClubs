import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function GenericControl({ header, children }) {
  return (
    <ComponentContainer>
      <MainHeader>
        {header}
      </MainHeader>
      {children}
    </ComponentContainer>
  );
}

GenericControl.propTypes = {
  header: PropTypes.string.isRequired,
  children: PropTypes.element,

};

GenericControl.defaultProps = {
  children: [],
};

const ComponentContainer = styled.div`
      flex:${(props) => props.Flex};
      margin: 30px 0;
`;

const MainHeader = styled.h2`
    font-family: 'Roboto Condensed', sans-serif;
    font-size:28rem;
    font-weight: normal;
`;

export default GenericControl;
