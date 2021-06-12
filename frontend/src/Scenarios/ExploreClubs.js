/* eslint-disable no-nested-ternary */

import React from 'react';
import styled from 'styled-components';
import BaseLoader from 'react-loader-spinner';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
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
  ClubsCardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    padding: '0.1rem',
    marginLeft: '-9%',
    gridGap: '2%',
    alignItems: 'left',
    [theme.breakpoints.down('md')]: {
      marginLeft: '0%',
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: '0%',
    },
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
        <ClubsView
          data={clubsData}
          width={width}
          Container={({ children }) => (
            <Container className={classes.ClubsCardContainer}>
              {children}
            </Container>
          )}
        />
      ) : (
        <EmptyStateErorSearch />
      )}
    </>
  );
};

export default ExploreClubs;
