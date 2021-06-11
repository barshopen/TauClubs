import React from 'react';
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom';
import EmptyState from '@pluralsight/ps-design-system-emptystate';
import Typography from '@material-ui/core/Typography';
import styled, { css } from 'styled-components';
import { useRecoilValue } from 'recoil';
import AboutUs from './AboutUs';
import ClubBoard from './ClubBoard';
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

  const { clubData } = useClub(clubId);

  const user = useRecoilValue(currentUser);

  let join = null;
  if (user) {
    if (clubData?.member) {
      join = (
        <NavLinkLeave to={`/club/leave/${clubId}`}>Leave club</NavLinkLeave>
      );
    } else if (clubData?.pending) {
      join = <NavWithoutLink>Pending</NavWithoutLink>;
    } else {
      join = <NavLinkJoin to={`/club/joinus/${clubId}`}>Join</NavLinkJoin>;
    }
  }

  return (
    <SimpleContaConiner>
      <Typography variant='h5'>{clubData?.name}</Typography>

      {clubData?.profileImage ? (
        <img src={`/${clubData.profileImage}`} height={200} alt='wallpaper' />
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
          {join}
        </Nav>
      </NavBarContainer>
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
