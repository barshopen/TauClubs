import React from 'react';
import {
  Nav, NavBtn, NavBtnLink, NavLink, Bars, NavMenu,
} from './NavbarElements';

function Navbar() {
  return (
    <>
      <Nav>
        <Bars />

        <NavMenu>
          <NavLink to="/" exact activeStyle>
            Home
          </NavLink>
          <NavLink to="/allClubs" activeStyle>
            All Clubs
          </NavLink>
          <NavLink to="/contact" activeStyle>
            Contact us
          </NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink to="/SignIn">Sign In</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
}

export default Navbar;
