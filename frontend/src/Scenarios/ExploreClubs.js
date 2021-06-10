/* eslint-disable no-nested-ternary */

import React from 'react';
import styled from 'styled-components';
import BaseLoader from 'react-loader-spinner';
import ClubsView from '../Components/ClubsView';
import useClubs from '../hooks/useClubs';
import EmptyStateSearch from './EmptyStateSearch';

const width = '100%';

const Loader = styled(BaseLoader)`
  margin-top: 25%;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ExploreClubs = () => {
  const { loadingClubs, clubs: clubsData } = useClubs();

  return (
    <>
      {loadingClubs ? (
        <Wrapper>
          <Loader type='TailSpin' color='#00BFFF' height={150} width={150} />
        </Wrapper>
      ) : clubsData.length > 0 ? (
        <ClubsView width={width} data={clubsData} Container={StyledContainer} />
      ) : (
        <EmptyStateSearch />
      )}
    </>
  );
};

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 40px;
  align-items: center;
`;
export default ExploreClubs;
