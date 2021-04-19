import React, { useState } from 'react';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`
  display:grid;
  grid-template-columns:repeat(10, 1fr);
  grid-template-areas:
      "nl1 nl2 nl3  sb sb sb sb sb  nl4 nl5 ";
  grid-gap:40px;
  align-items:center;
  background: #000000;
  height: 60px;
  font-size: 14px;
  font: Roboto;
`;

export const NavLink = styled(Link)`
  float: left;
  color: #ffffff;
  display: inline-grid;
  align-items: center;
  text-decoration: none;
  font-weight: bold;
  white-space: nowrap;
  grid-area: ${(props) => props.gridArea};
  &.active {
    color: #2561da;
  }

`;
const NavBarSearch = styled.form`
  grid-area: sb;

`;
const SearchBox = styled.input`
  margin: 11px 15px;
  padding: 8px 8px;
  width:300px;
  border-style: solid; border-width: 2px; border-color: #000; border-radius: 20px;
`;

const SearchButton = styled.button`
  color: #fff;
  margin-right: 200px;
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

        <NavLink to="/" exact gridArea="nl1">
          Home
        </NavLink>
        <NavLink to="/allClubs" gridArea="nl2">
          All Clubs
        </NavLink>
        <NavLink to="/contact" gridArea="nl3">
          Contact Us
        </NavLink>
        <NavLink to="/createnewclub" gridArea="nl4">
          Create Club
        </NavLink>
        <NavBarSearch>
          <SearchBox
            placeholder="Search..."
            type="search"
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
          />
          <SearchButton onClick={(e) => handleClick(e)} type="button">
            Search
          </SearchButton>
        </NavBarSearch>
        <NavLink to="/signin" activeStyle gridArea="nl5">
          Sign In
        </NavLink>
      </Nav>
    </>
  );
}

export default Navbar;
