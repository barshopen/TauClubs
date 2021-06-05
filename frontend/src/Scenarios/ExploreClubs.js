/* eslint-disable no-nested-ternary */

import React from 'react';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';
import ClubsView from '../Components/ClubsView';
import useClubs from '../hooks/useClubs';
import EmptyStateSearch from './EmptyStateSearch';

const width = '100%';

const ExploreClubs = ({ search, setSearch }) => {
  const { loadingClubs, clubs: clubsData } = useClubs(search);

  // const loading = true;
  // - fix location of the loader

  return (
    <>
      {loadingClubs ? (
        <Loader type='TailSpin' color='#00BFFF' height={150} width={150} />
      ) : clubsData?.length > 0 ? (
        <ClubsView width={width} data={clubsData} Container={StyledContainer} />
      ) : (
        <EmptyStateSearch search={search} setSearch={setSearch} />
      )}
    </>
  );
};

ExploreClubs.propTypes = {
  search: PropTypes.string,
  setSearch: PropTypes.func,
};

ExploreClubs.defaultProps = {
  search: '',
  setSearch: undefined,
};

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 40px;
  align-items: center;
`;
export default ExploreClubs;
