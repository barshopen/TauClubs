import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { CustomPlaceholder } from 'react-placeholder-image';
import GenericControl from './Generic/GenericControl';
import GenericCard from './Generic/GenericCard';
import { Labels } from './Generic/Label';

const green = '#00d989';

function ClubsView({
  header, data, width, Container,
}) {
  return (
    <GenericControl header={header} width={width} Container={Container}>
      {data.map((d) => (
        <GenericCard key={d.name} title={d.name}>
          <LineContainer>
            <Labels tags={d.tags} color={green} />
            <Text>{`${d.membersCount} Members`}</Text>
          </LineContainer>
          <CustomPlaceholder width={260} height={180} />
        </GenericCard>
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
    }),
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

const Text = styled.div`
    font-size: 15rem;
    text-align: right;
    flex: 1;
`;

const LineContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  height: auto;
  margin: 10px 0;
  `;
