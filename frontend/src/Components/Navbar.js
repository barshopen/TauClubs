import React, { useState } from 'react';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

const SearchBox = styled.input`
  margin: 7px 15px;
  padding: 8px 8px;
  font-size: 14px;
  width: 15%;
  max-width: 20%;
  border-style: solid;
  border-width: 2px;
  border-color: #000;
  border-radius: 20px;
`;

const SearchButton = styled.button`
  color: #fff;
  margin-right: 200px;
`;

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

  margin: -30px 50px 0px 0px;
  text-decoration: none;
  font: Roboto;
  font-weight: bold;
  font-size: 14px;
  &.active {
    color: #2561da;
  }
`;

function Navbar() {
  const [searchData, setSearchData] = useState();

  const handleClick = (e) => {
    e.preventDefault();
    // TODO make search here
  };
  return (
    <>
      <Nav>
        <NavLink to="/" exact activeStyle>
          Home
        </NavLink>
        <NavLink to="/allClubs" activeStyle>
          All Clubs
        </NavLink>
        <NavLink to="/contact" activeStyle>
          Contact Us
        </NavLink>
        <NavLink to="/createnewclub" activeStyle>
          Create Club
        </NavLink>
        <form>
          <SearchBox
            placeholder="Search..."
            type="search"
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
          />
          <SearchButton onClick={(e) => handleClick(e)} type="button">
            {' '}
            Search
          </SearchButton>
        </form>
        <NavSignIn to="/signin" activeStyle>
          Sign In
        </NavSignIn>
      </Nav>
    </>
  );
}

export default Navbar;
