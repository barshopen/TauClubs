import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import GenericControl from './Generic/GenericControl';
import GenericCard from './Generic/GenericCard';
import { Labels } from './Generic/Label';

const green = '#00d989';

const Text = styled.div`
  font-size: 15px;
  text-align: right;
  flex: 1;
`;

const LineContainer = styled.div`
  display: flex;
  align-items: flex-start;
  height: auto;
  margin: 10px 0;
`;

function ClubsView({ header, data, width, Container }) {
  return (
    <GenericControl header={header} width={width} Container={Container}>
      {data.map(({ id, name, tags, membersCount, profileImage }) => (
        <Link key={id} to={`/club/board/${id}`}>
          <GenericCard title={name}>
            <Text>{`${membersCount} Members`}</Text>
            <img
              src={profileImage}
              alt=''
              width={width}
              height={205}
              style={{ minWidth: '100%', minHeight: '100%' }}
            />
            <LineContainer>
              <Labels tags={tags} color={green} />
            </LineContainer>
          </GenericCard>
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
  width: '100%',
};
export default ClubsView;
