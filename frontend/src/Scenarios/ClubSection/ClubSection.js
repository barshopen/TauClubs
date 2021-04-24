import React, { useEffect, useState } from 'react';
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom';
import styled from 'styled-components';
import AboutUs from './AboutUs';
import ClubBoard from './ClubBoard';
import Contact from './Contact';
import JoinUs from './JoinForm/JoinUs';
import SimpleContaConiner from '../../Components/Generic/SimpleContaConiner';

const NavBarContainer = styled.div`
  border-color: black white;
  border-style: solid;
  padding: 5px;
  margin: 15px 0;
`;

const Header = styled.h2`
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 1rem;
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

/* const RightNavLink = styled(NavLink)`
  grid-column: 12;
  border: 1px solid white;
  padding: 3px 8px;
  transition-duration: 0.4s;

  &:hover {
    background-color: white;
    color: #393939;
  }
`; */

function ClubSection() {
  const {
    params: { clubId },
  } = useRouteMatch('/club/*/:clubId');
  const [clubData, setClubData] = useState();

  useEffect(() => {
    fetch(`http://localhost:5000/clubs/${clubId}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(res => res.json())
      .then(mydata => setClubData(mydata));
  }, [clubId]);
  useEffect(() => {}, [clubData]);
  return (
    <SimpleContaConiner style={{ height: '80vh' }}>
      {/* TODO derieve data from api request. */}
      <Header>Chess</Header>
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
            <NavLink to={`/club/contact/${clubId}`}>Contact</NavLink>
            <NavLink to={`/club/joinus/${clubId}`}>Join</NavLink>
          </Nav>
        </NavBarContainer>
      </HeaderPhoto>
      <Switch>
        <Route path='/club/board/:clubId' component={ClubBoard} />
        <Route path='/club/about/:clubId' component={AboutUs} />
        <Route path='/club/contact/:clubId' component={Contact} />
        <Route path='/club/joinus/:clubId' component={JoinUs} />
      </Switch>
    </SimpleContaConiner>
  );
}

export default ClubSection;
