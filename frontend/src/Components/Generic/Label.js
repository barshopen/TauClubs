import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function Label({ children, color }) {
  return (
    <div>
      <Tag color={color}>
        {children}
      </Tag>
    </div>
  );
}

Label.propTypes = {
  children: PropTypes.string.isRequired, // TODO force the element to be always text...
  color: PropTypes.string.isRequired,
};

const Tag = styled.span`
  font-size: 15rem;
  padding: 0 7px;
  background-color:${(props) => props.color}; 
  border-radius:20px;
`;
export default Label;
