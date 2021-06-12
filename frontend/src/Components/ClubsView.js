import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import GenericControl from './Generic/GenericControl';
import ClubCard from './ClubCard';

const green = '#00d989';

function ClubsView({ header, data, width, Container }) {
  return (
    <GenericControl header={header} width={width} Container={Container}>
      {data.map(({ id, name, tags, membersCount, profileImage }) => (
        <Link key={id} to={`/club/board/${id}`}>
          <ClubCard
            title={name}
            img={profileImage}
            tags={tags}
            count={membersCount}
            color={green}
          />
        </Link>
      ))}
    </GenericControl>
  );
}

ClubsView.propTypes = {
  header: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.int,
      name: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
      membersCount: PropTypes.int,
      /* TODO decide represented base64-decoded -string or another http request. */
      photo: PropTypes.string,
    })
  ),
  Container: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.shape({ render: PropTypes.func.isRequired }),
  ]).isRequired,
  width: PropTypes.string,
};

ClubsView.defaultProps = {
  data: [],
  header: '',
  width: '',
};
export default ClubsView;
