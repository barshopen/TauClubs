import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function MyClubs({ data }) {
  return (
    <>
      <MainHeader> My Clubs </MainHeader>
      {data.map((d) => (
        <ItemHeader>{d.title}</ItemHeader>
      ))}

    </>
  );
}

MyClubs.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      date: PropTypes.string,
      text: PropTypes.string,
    }),
  ),
};

MyClubs.defaultProps = {
  data: [],
};
export default MyClubs;

const MainHeader = styled.h1`
    font-family: 'Roboto Condensed';
    font-size:35px;
    font-weight: normal;
`;

const ItemHeader = styled.div`
    font-size:25px;
    font-weight: bold;
    text-transform: capitalize;
    text-align:left;
`;
