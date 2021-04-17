import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { CustomPlaceholder } from 'react-placeholder-image';
import GenericControl from './Generic/GenericControl';
import GenericCard from './Generic/GenericCard';
import Label from './Generic/Label';

const width = '90%';

function ClubsView({ data }) {
  return (
    <GenericControl header="My Clubs" width={width}>
      { /* TODO find less way to acheive thie width property
          genralize containers for all controls. */}
      <Container width={width}>
        {data.map((d) => (
          <GenericCard title={d.name} key={d.id}>
            <LineContainer>

              <Label color="#00d989">aasdasd</Label>
              <Text>{`${d.membersCount} Members`}</Text>
            </LineContainer>
            <CustomPlaceholder width={260} height={180} />
          </GenericCard>
        ))}
      </Container>
    </GenericControl>
  );
}

ClubsView.propTypes = {
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

const Text = styled.div`
    font-size: 15rem;
    text-align: right;
`;

ClubsView.defaultProps = {
  data: [],
};
export default ClubsView;

const Container = styled.div`
    display:grid;
    grid-template-columns:repeat(3, 1fr);
    width:${(props) => props.width}; 
    grid-gap:10px;
`;
const LineContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  height: auto;
  `;
