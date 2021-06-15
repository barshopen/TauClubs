import React from 'react';
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom';
import EmptyState from '@pluralsight/ps-design-system-emptystate';
import Typography from '@material-ui/core/Typography';
import styled, { css } from 'styled-components';
import { useRecoilValue } from 'recoil';
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
});
const NavBarContainer = styled.div`
  border-color: black white;
  border-style: solid;
  padding: 5px;
  margin: 15px 0;
`;

const Nav = styled.nav`
  height: 38px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
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

const ClubSection = () => {
  const {
    params: { clubId },
  } = useRouteMatch('/club/*/:clubId');
  const classes = useStyles();
  const { clubData } = useClub(clubId);
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

  let join = null;
  if (user) {
    if (member) {
      join = (
        <NavLinkLeave to={`/club/leave/${clubId}`}>Leave club</NavLinkLeave>
      );
    } else if (pending) {
      join = <NavWithoutLink>Pending</NavWithoutLink>;
    } else {
      join = <NavLinkJoin to={`/club/joinus/${clubId}`}>Join</NavLinkJoin>;
    }
  }
  const img = profileImage
    ? `${window.origin}/db/images/${clubId}`
    : '/images/taulogo.png';
  return (
    <Container>
      <Box textAlign='center' p={2}>
        <Typography variant='h4'>{name}</Typography>
      </Box>
      {!admin && (
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
          <NavLink to={`/club/board/${clubId}`} start='2'>
            Club Board
          </NavLink>
          <NavLink to={`/club/about/${clubId}`}>About Us</NavLink>
          {join}
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
            <AboutUs description={description} contactMail={contactMail} />
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
