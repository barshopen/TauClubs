import React from 'react';
import {
  Nav, NavLink, Bars, NavMenu,
} from './NavbarElements';

function Navbar() {
  return (
    <>
      <Nav>
        <Bars />

        <NavMenu>
          <NavLink to="/Home" activeStyle>
            Home
          </NavLink>
          <NavLink to="/allClubs" activeStyle>
            All Clubs
          </NavLink>
          <NavLink to="/contact" activeStyle>
            Contact
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
}

export default Navbar;
