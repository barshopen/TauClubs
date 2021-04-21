import React, { useEffect, useState } from 'react';
import {
  Switch, Route, useRouteMatch, Link,
} from 'react-router-dom';
import styled from 'styled-components';
import AboutUs from './AboutUs';
import ClubBoard from './ClubBoard';
import Contact from './Contact';
import JoinUs from './JoinUs';

const Header = styled.h2`
  font-family: 'Roboto Condensed', sans-serif;
  font-size:40rem;
  margin: 25px 0;
  font-weight: normal;
  text-align: center;
`;

const HeaderPhoto = styled.div`
  & img{
    min-width:100%;
    object-fit:cover;
    display: block;
  }
`;

const Nav = styled.nav`
  background: #393939;
  height: 38px;
  display:grid;
  grid-template-columns:repeat(12, 1fr);
`;

const NavLink = styled(Link)`
  display: inline-grid;
  text-decoration: none; font: Roboto; font-size: 14px; color: #ffffff;
  justify-self: center;
  align-self: center;
  &.active {
    color: #00b874;
  }
`;

const RightNavLink = styled(NavLink)`
  grid-column: 12;
  border: 1px solid white; 
  padding:3px 8px;
  transition-duration: 0.4s;

  &:hover{
    background-color:white;
    color: #393939;
  }
`;

function ClubSection() {
  const { params: { clubId } } = useRouteMatch('/club/*/:clubId');
  const [clubData, setClubData] = useState();

  useEffect(() => {
    fetch(`http://localhost:5000/clubs/${clubId}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((mydata) => setClubData(mydata));
  }, [clubId]);
  useEffect(() => {
  }, [clubData]);
  return (
    <div>
      {/* TODO derieve data from api request. */}
      <Header>Chess</Header>
      <HeaderPhoto>

        <img
          src={clubData ? `/${clubData.profileImage}` : ''}
          width={1000}
          height={200}
          alt="wallpaper"
        />
        <Nav>
          <NavLink to={`/club/board/${clubId}`}>Club Board</NavLink>
          <NavLink to={`/club/about/${clubId}`}>About Us</NavLink>
          <NavLink to={`/club/contact/${clubId}`}>Contact</NavLink>
          <RightNavLink to={`/club/joinus/${clubId}`}>Join</RightNavLink>
        </Nav>
      </HeaderPhoto>
      <Switch>
        <Route path="/club/board/:clubId" component={ClubBoard} />
        <Route path="/club/about/:clubId" component={AboutUs} />
        <Route path="/club/contact/:clubId" component={Contact} />
        <Route path="/club/joinus/:clubId" component={JoinUs} />
      </Switch>

    </div>
  );
}

export default ClubSection;
