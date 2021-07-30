import React, { useEffect, useState } from 'react';
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom';
import BaseLoader from 'react-loader-spinner';
import EmptyState from '@pluralsight/ps-design-system-emptystate';
import Typography from '@material-ui/core/Typography';
import styled, { css } from 'styled-components';
import { useRecoilValue } from 'recoil';
import Button from '@material-ui/core/Button';
import { Box, makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import AboutUs from './AboutUs';
import ClubBoard from './ClubBoard';
import JoinUs from './JoinForm/JoinUs';
import Leave from './JoinForm/Leave';
import useClub from '../../hooks/useClub';
import { currentUser } from '../../Shared/atoms';
import UploadImageModal from '../UploadImageModal';

const useStyles = makeStyles({
  headerPhoto: {
    minWidth: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  emptyImage: {
    color: 'black',
    '&:hover': { color: 'red', cursor: 'pointer' },
  },
  root: {
    background: props => props.backgroundColor,
    color: props => props.color,
  },
});
const NavBarContainer = styled.div`
  border-color: black white;
  border-style: solid;
  padding: 2%;
  margin: 2%;
`;

const Loader = styled(BaseLoader)`
  margin-top: 25%;
  display: flex;
  justify-content: center;
`;

const Nav = styled.nav`
  height: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(1rem, 1fr));
  padding: '0.1rem';
`;

const NavLinkStyle = css`
  display: inline-grid;
  text-decoration: none;
  font: Roboto;
  grid-column-start: ${props => props.start};
  font-size: 1rem;
  color: black;
  justify-self: center;
  align-self: center;
  &.active {
    color: #00b874;
  }
`;

const NavLink = styled(Link)`
  ${NavLinkStyle};
`;

const NavLinkJoin = styled(NavLink)`
  color: green;
`;
const NavLinkLeave = styled(NavLink)`
  color: red;
`;
const NavWithoutLink = styled.h1`
  ${NavLinkStyle};
  color: blueviolet;
`;

const TABS = {
  main: 0,
  about: 1,
  join: 2,
};

// eslint-disable-next-line react/prop-types
const Tab = ({ isClicked, children, onClick, color }) => {
  const styleProps = {
    backgroundColor: isClicked ? '#e0e0e0' : 'none',
    color,
  };
  const classes = useStyles(styleProps);
  return (
    <Button onClick={onClick} className={classes.root}>
      {children}
    </Button>
  );
};

const ClubSection = () => {
  const {
    params: { clubId },
  } = useRouteMatch('/club/*/:clubId');
  const classes = useStyles();
  const { loadingClub, clubData } = useClub(clubId);

  const {
    member,
    admin,
    pending,
    name,
    description,
    contactMail,
    profileImage,
  } = clubData || {};

  const user = useRecoilValue(currentUser);
  const [currentIndex, setCurrentIndex] = useState(TABS.main);

  useEffect(() => setCurrentIndex(TABS.main), [clubData]);

  let join = null;
  if (user) {
    if (member) {
      join = (
        <NavLinkLeave to={`/club/leave/${clubId}`}>
          <Tab
            isClicked={currentIndex === TABS.join}
            onClick={() => setCurrentIndex(TABS.join)}
            color='red'>
            Leave club
          </Tab>
        </NavLinkLeave>
      );
    } else if (pending) {
      join = (
        <NavWithoutLink>
          <Tab
            isClicked={currentIndex === TABS.join}
            onClick={() => setCurrentIndex(TABS.join)}
            color='blueviolet'>
            Pending
          </Tab>
        </NavWithoutLink>
      );
    } else {
      join = (
        <NavLinkJoin to={`/club/joinus/${clubId}`}>
          <Tab
            isClicked={currentIndex === TABS.join}
            onClick={() => setCurrentIndex(TABS.join)}
            color='green'>
            Join
          </Tab>
        </NavLinkJoin>
      );
    }
  }
  const img = profileImage
    ? `${window.origin}/db/images/${clubId}`
    : '/images/taulogo.png';

  if (loadingClub) {
    return <Loader type='TailSpin' color='#00BFFF' height={100} width={100} />;
  }

  return (
    <Container>
      <Box textAlign='center' p={2}>
        <Typography variant='h4'>{name}</Typography>
      </Box>
      {(!admin || (admin && profileImage)) && (
        <img
          className={classes.headerPhoto}
          src={img}
          height={200}
          alt='wallpaper'
        />
      )}
      {admin && !profileImage && (
        <UploadImageModal
          clubId={clubId}
          ClickableTrigger={({ onClick }) => (
            <EmptyState
              className={classes.emptyImage}
              onClick={onClick}
              heading={
                <EmptyState.Heading style={{ fontSize: 14 }}>
                  No image yet! Click here to add an image
                </EmptyState.Heading>
              }
              illustration={<EmptyState.Illustration name='image' />}
              size='small'
            />
          )}
        />
      )}

      <NavBarContainer>
        <Nav>
          <NavLink to={`/club/board/${clubId}`}>
            <Tab
              isClicked={currentIndex === TABS.main}
              onClick={() => setCurrentIndex(TABS.main)}>
              Club Board
            </Tab>
          </NavLink>
          <NavLink to={`/club/about/${clubId}`}>
            <Tab
              isClicked={currentIndex === TABS.about}
              onClick={() => setCurrentIndex(TABS.about)}>
              About Us
            </Tab>
          </NavLink>
          {admin ? (
            <NavLink to='/profile/clubs'>
              <Tab
                isClicked={currentIndex === TABS.join}
                onClick={() => setCurrentIndex(TABS.join)}>
                Manage
              </Tab>
            </NavLink>
          ) : (
            join
          )}
        </Nav>
      </NavBarContainer>
      <Switch>
        <Route
          path='/club/board/:clubId'
          component={() => <ClubBoard currentUserIsClubsAdmin={admin} />}
        />
        <Route
          path='/club/about/:clubId'
          component={() => (
            <AboutUs
              name={name}
              description={description}
              contactMail={contactMail}
            />
          )}
        />
        {user && !pending && !member && (
          <Route
            path='/club/joinus/:clubId'
            component={() => <JoinUs clubName={name} clubId={clubId} />}
          />
        )}
        {user && member && (
          <Route
            path='/club/leave/:clubId'
            component={() => <Leave clubName={name} clubId={clubId} />}
          />
        )}
      </Switch>
    </Container>
  );
};

export default ClubSection;
