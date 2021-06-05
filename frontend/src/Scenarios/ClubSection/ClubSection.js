import React from 'react';
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom';
import styled from 'styled-components';
import EmptyState from '@pluralsight/ps-design-system-emptystate';
import Typography from '@material-ui/core/Typography';
import AboutUs from './AboutUs';
import ClubBoard from './ClubBoard';
import Contact from './Contact';
import JoinUs from './JoinForm/JoinUs';
import SimpleContaConiner from '../../Components/Generic/SimpleContaConiner';
import useClub from '../../hooks/useClub';

const NavBarContainer = styled.div`
  border-color: black white;
  border-style: solid;
  padding: 5px;
  margin: 15px 0;
`;

const HeaderPhoto = styled.div`
  & img {
    min-width: 100%;
    object-fit: cover;
    display: block;
  }
`;

const Nav = styled.nav`
  height: 38px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
`;

const NavLink = styled(Link)`
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

const ClubSection = () => {
  const {
    params: { clubId },
  } = useRouteMatch('/club/*/:clubId');

  const { clubData } = useClub(clubId);
  const admin = true;

  return (
    <SimpleContaConiner style={{ height: '80vh' }}>
      <Typography variant='h5'>{clubData?.name}</Typography>

      {clubData?.profileImage ? (
        <HeaderPhoto>
          <img src={`/${clubData.profileImage}`} height={200} alt='wallpaper' />
        </HeaderPhoto>
      ) : (
        <EmptyState
          style={{ color: 'black', height: 200 }}
          heading={
            <EmptyState.Heading style={{ fontSize: 14 }}>
              No image yet! Click here to add an image
            </EmptyState.Heading>
          }
          illustration={<EmptyState.Illustration name='image' />}
          size='small'
        />
      )}

      <NavBarContainer>
        <Nav>
          <NavLink to={`/club/board/${clubId}`} start='2'>
            Club Board
          </NavLink>
          <NavLink to={`/club/about/${clubId}`}>About Us</NavLink>
          <NavLink to={`/club/contact/${clubId}`}>Contact</NavLink>
          <NavLink to={`/club/joinus/${clubId}`}>Join</NavLink>
        </Nav>
      </NavBarContainer>
      <Switch>
        <Route
          path='/club/board/:clubId'
          component={() => (
            // <ClubBoard currentUserIsClubsAdmin={clubData?.admin} />
            <ClubBoard currentUserIsClubsAdmin={admin} />
          )}
        />
        <Route
          path='/club/about/:clubId'
          component={() => <AboutUs description={clubData?.description} />}
        />
        <Route
          path='/club/contact/:clubId'
          component={() => <Contact clubName={clubData?.name} />}
        />
        <Route
          path='/club/joinus/:clubId'
          component={() => <JoinUs clubName={clubData?.name} clubId={clubId} />}
        />
      </Switch>
    </SimpleContaConiner>
  );
};

export default ClubSection;
