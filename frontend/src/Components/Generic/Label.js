import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export function Label({ children, color }) {
  return (
    <Tag color={color}>
      {children}
    </Tag>
  );
}
Label.propTypes = {
  children: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export function Labels({ tags, color }) {
  return (
    <>
      {tags.map((tag) => (<Label key={tag} color={color}>{tag}</Label>))}
    </>
  );
}

Labels.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  color: PropTypes.string.isRequired,
};

const Tag = styled.span`
  font-size: 15rem;
  padding: 0 7px;
  background-color:${(props) => props.color}; 
  border-radius:20px;
  margin:0px 3px;
`;
