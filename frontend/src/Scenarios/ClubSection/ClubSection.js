import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
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
`;

const HeaderPhoto = styled.div`
  & img{
    width:100%;

  }
`;
function ClubSection() {
  const { path } = useRouteMatch();
  // pass options to customize the background-color, text, and height

  return (
    <div>
      {/* TODO derieve data from api request. */}
      <Header>Chess</Header>
      {/* 1500 width ought to be enough to anyone */}
      <HeaderPhoto>
        <PhotoPlaceholder width={1000} height={300} as="img" />

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
