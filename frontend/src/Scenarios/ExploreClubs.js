import React from 'react';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';
import ClubsView from '../Components/ClubsView';
import useClubs from '../hooks/useClubs';

const width = '100%';

const ExploreClubs = ({ search }) => {
  const { loadingClubs, clubs: clubsData } = useClubs(search);

  // const loading = true;
  // - fix location of the loader

  return (
    <>
      {loadingClubs ? (
        <Loader type='TailSpin' color='#00BFFF' height={150} width={150} />
      ) : (
        <ClubsView width={width} data={clubsData} Container={StyledContainer} />
      )}
    </>
  );
};

ExploreClubs.propTypes = {
  search: PropTypes.string,
};

ExploreClubs.defaultProps = {
  search: '',
};

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 40px;
  align-items: center;
`;
export default ExploreClubs;
