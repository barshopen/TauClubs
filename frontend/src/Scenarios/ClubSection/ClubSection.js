import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, useRouteMatch,
} from 'react-router-dom';
import AboutUs from './AboutUs';
import ClubBoard from './ClubBoard';
import Contact from './Contact';
import JoinUs from './JoinUs';

function ClubSection() {
  const { path } = useRouteMatch();

  return (
    <div>
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
