import React from 'react';
import {
  Switch, Route, useRouteMatch, useParams, Link,
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
  const { clubId } = useParams();
  const { path } = useRouteMatch();

  // pass options to customize the background-color, text, and height

  return (
    <div>
      {/* TODO derieve data from api request. */}
      <Header>Chess</Header>
      <HeaderPhoto>
        <PhotoPlaceholder width={1000} height={200} as="img" alt="wallpaper" />
        <Nav>
          <NavLink>Club Board</NavLink>
          <NavLink>About Us</NavLink>
          <NavLink>Join Us</NavLink>
          <NavLink>Contact</NavLink>
        </Nav>
      </HeaderPhoto>
      <Switch>
        <Route exact path={path} component={ClubBoard} />
        <Route path={`${path}/about`} component={AboutUs} />
        <Route path={`${path}/contact`} component={Contact} />
        <Route path={`${path}/joinus`} component={JoinUs} />
      </Switch>

    </div>
  );
}

export default ClubSection;
