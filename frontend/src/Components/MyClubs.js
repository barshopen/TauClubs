import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import GenericControl from './Generic/GenericControl';

function MyClubs({ data }) {
  return (
    <GenericControl header="My Clubs">
      {data.map((d) => (
        <ItemHeader key={d.id}>{d.name}</ItemHeader>
      ))}
    </GenericControl>
  );
}

MyClubs.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.int,
      name: PropTypes.string,
      num_of_users: PropTypes.int, // todo change to usersCount
      /* TODO decide represented base64-decoded -string or another http request. */
      photo: PropTypes.string,
    }),
  ),
};

MyClubs.defaultProps = {
  data: [],
};
export default MyClubs;

const ItemHeader = styled.div`
    font-size:25px;
    font-weight: bold;
    text-transform: capitalize;
    text-align:left;
`;
