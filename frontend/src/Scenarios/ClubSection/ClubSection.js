import React, { useEffect, useState } from 'react';
import {
  Switch, Route, useRouteMatch, Link,
} from 'react-router-dom';
import styled from 'styled-components';
import { PhotoPlaceholder } from 'react-placeholder-image';
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
    width:100%;
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

  return (
    <div>
      {/* TODO derieve data from api request. */}
      <Header>Chess</Header>
      <HeaderPhoto>
        <PhotoPlaceholder width={1000} height={200} as="img" alt="wallpaper" />
        <Nav>
          <NavLink to={`/club/board/${clubId}`}>Club Board</NavLink>
          <NavLink to={`/club/about/${clubId}`}>About Us</NavLink>
          <NavLink to={`/club/joinus/${clubId}`}>Join Us</NavLink>
          <NavLink to={`/club/contact/${clubId}`}>Contact</NavLink>
        </Nav>
      </HeaderPhoto>
      <Switch>
        <Route path="/club/board/:clubId" render={() => <ClubBoard props={{ clubData }} />} />
        <Route path="/club/about/:clubId" render={() => <AboutUs props={{ clubData }} />} />
        <Route path="/club/contact/:clubId" render={() => <Contact props={{ clubData }} />} />
        <Route path="/club/joinus/:clubId" render={() => <JoinUs props={{ clubData }} />} />
      </Switch>

    </div>
  );
}

export default ClubSection;
