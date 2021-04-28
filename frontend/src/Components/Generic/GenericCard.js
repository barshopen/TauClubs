import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function GenericCard({ title, children }) {
  return (
    <ComponentContainer>
      <Title>{title}</Title>
      {children}
    </ComponentContainer>
  );
}

GenericCard.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.element),
};

GenericCard.defaultProps = {
  children: [],
};

const Title = styled.h3`
  font-size: 1rem;
  text-align: center;
`;
const ComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default GenericCard;
