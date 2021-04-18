import React from 'react';
import styled from 'styled-components';
import PropTypes, { string } from 'prop-types';
import { CustomPlaceholder } from 'react-placeholder-image';
import GenericControl from './Generic/GenericControl';
import GenericCard from './Generic/GenericCard';
import Label from './Generic/Label';

function ClubsView({
  header, data, width, Container,
}) {
  return (
    <GenericControl header={header} width={width} Container={Container}>
      { /* TODO find less way to acheive thie width property
          genralize containers for all controls. */}
      {data.map((d) => (
        <GenericCard title={d.name} key={d.id}>
          <LineContainer>
            <Label color="#00d989">aasdasd</Label>
            <Text>{`${d.membersCount} Members`}</Text>
          </LineContainer>
          <CustomPlaceholder width={260} height={180} />
        </GenericCard>
      ))}
    </GenericControl>
  );
}

ClubsView.propTypes = {
  header: string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.int,
      name: PropTypes.string,
      num_of_users: PropTypes.int, // todo change to usersCount
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
`;

const LineContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  height: auto;
  `;
