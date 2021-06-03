import React from 'react';
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import AboutUs from './AboutUs';
import ClubBoard from './ClubBoard';
import Contact from './Contact';
import JoinUs from './JoinForm/JoinUs';
import Leave from './JoinForm/Leave';
import SimpleContaConiner from '../../Components/Generic/SimpleContaConiner';
import useClub from '../../hooks/useClub';
import { currentUser } from '../../Shared/atoms';

const NavBarContainer = styled.div`
  border-color: black white;
  border-style: solid;
  padding: 5px;
  margin: 15px 0;
`;

const Header = styled.h2`
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 2rem;
  margin: 25px 0;
  font-weight: normal;
  text-align: center;
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
  grid-template-columns: repeat(5, 1fr);
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
const NavLinkJoin = styled(Link)`
  display: inline-grid;
  text-decoration: none;
  font: Roboto;
  grid-column-start: ${props => props.start};
  font-size: 1rem;
  color: green;
  justify-self: center;
  align-self: center;
  &.active {
    color: #00b874;
  }
`;
const NavLinkLeave = styled(Link)`
  display: inline-grid;
  text-decoration: none;
  font: Roboto;
  grid-column-start: ${props => props.start};
  font-size: 1rem;
  color: red;
  justify-self: center;
  align-self: center;
  &.active {
    color: #00b874;
  }
`;
const NavWithoutLink = styled.h1`
  display: inline-grid;
  text-decoration: none;
  font: Roboto;
  grid-column-start: ${props => props.start};
  font-size: 1rem;
  font-weight: bold;
  color: blueviolet;
  justify-self: right;
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

  const user = useRecoilValue(currentUser);

  let join = null;
  if (user) {
    if (clubData?.member) {
      join = (
        <NavLinkLeave to={`/club/leave/${clubId}`}>Leave club</NavLinkLeave>
      );
    } else if (clubData?.pending) {
      join = <NavWithoutLink>Pennding</NavWithoutLink>;
    } else {
      join = <NavLinkJoin to={`/club/joinus/${clubId}`}>Join</NavLinkJoin>;
    }
  }

  return (
    <SimpleContaConiner style={{ height: '80vh' }}>
      <Header>{clubData?.name}</Header>
      <HeaderPhoto>
        <img
          src={clubData ? `/${clubData.profileImage}` : ''}
          width={1000}
          height={200}
          alt='wallpaper'
        />
        <NavBarContainer>
          <Nav>
            <NavLink to={`/club/board/${clubId}`} start='2'>
              Club Board
            </NavLink>
            <NavLink to={`/club/about/${clubId}`}>About Us</NavLink>
            {join}
          </Nav>
        </NavBarContainer>
      </HeaderPhoto>
      <Switch>
        <Route
          path='/club/board/:clubId'
          component={() => (
            <ClubBoard currentUserIsClubsAdmin={clubData?.admin} />
          )}
        />
        <Route
          path='/club/about/:clubId'
          component={() => (
            <AboutUs
              description={clubData?.description}
              contactMail={clubData?.contactMail}
            />
          )}
        />
        {user && !clubData?.pending && !clubData?.member && (
          <Route
            path='/club/joinus/:clubId'
            component={() => (
              <JoinUs clubName={clubData?.name} clubId={clubId} />
            )}
          />
        )}
        {user && clubData?.member && (
          <Route
            path='/club/leave/:clubId'
            component={() => (
              <Leave clubName={clubData?.name} clubId={clubId} />
            )}
          />
        )}
      </Switch>
    </SimpleContaConiner>
  );
};

export default ClubSection;
/// need to change after join the status
