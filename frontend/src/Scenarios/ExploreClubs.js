/* eslint-disable no-nested-ternary */

import React from 'react';
import styled from 'styled-components';
import BaseLoader from 'react-loader-spinner';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { GridListTile, Typography } from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import ClubsView from '../Components/ClubsView';
import useClubs from '../hooks/useClubs';
import EmptyStateErorSearch from './EmptyStateErrorSearch';

const width = '100%';

const Loader = styled(BaseLoader)`
  margin-top: 25%;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const ExploreClubs = () => {
  const { loadingClubs, clubs: clubsData } = useClubs();
  const classes = useStyles();

  return (
    <>
      {loadingClubs ? (
        <Wrapper>
          <Loader type='TailSpin' color='#00BFFF' height={150} width={150} />
        </Wrapper>
      ) : clubsData.length > 0 ? (
        <ClubsView data={clubsData} width={width} Container={StyledContainer} />
      ) : (
        <EmptyStateErorSearch />
      )}
    </>
  );
};

const StyledContainer = styled.div`
  display: grid;
  width: '100%';
  padding: 0.1em;
  margin: 1%;
  // grid-template-columns: 1fr 1fr 1fr;
  // grid-template-columns: 3fr;
  grid-template-columns: repeat(auto-fill, minmax(300px, 2fr));
  grid-gap: 1%;
  align-items: center;
`;
export default ExploreClubs;
