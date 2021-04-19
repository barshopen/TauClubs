import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`
  background: #000000;
  height: 60px;
`;

export const NavLink = styled(Link)`
  float: left;
  color: #ffffff;
  padding: 20px 10px 10px 25px;
  margin: 0px 0px 0px 25px;
  display: inline-grid;
  align-items: center;
  text-decoration: none;
  font: Roboto;
  font-weight: bold;
  font-size: 14px;
  white-space: nowrap;
  &.active {
    color: #2561da;
  }
`;

export const NavSignIn = styled(Link)`
  color: #ffffff;
  float: right;
  padding: 20px 50px 25px 25px;
  margin: 0px 0px 0px 25px;
  align-items: center;
  text-decoration: none;
  font: Roboto;
  font-weight: bold;
  font-size: 14px;
  &.active {
    color: #2561da;
  }
`;

function Navbar() {
  return (
    <>
      <Nav>
        <NavLink to="/" exact>
          Home
        </NavLink>
        <NavLink to="/allClubs">
          All Clubs
        </NavLink>
        <NavLink to="/contact">
          Contact Us
        </NavLink>
        <NavSignIn to="/signin">
          Sign In
        </NavSignIn>
      </Nav>
    </>
  );
}

export default Navbar;
