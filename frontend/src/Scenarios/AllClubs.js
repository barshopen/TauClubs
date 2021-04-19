import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ClubsView from '../Components/ClubsView';

const width = '95%';

const Ribbon = styled.div`
  background: #393939;
`;
const SearchBox = styled.input`
  margin: 7px 15px;
  padding: 8px 8px;
  font-size: 14px;
  width:35%;
  max-width: 40%;
  border-style: solid; border-width: 2px; border-color: #000; border-radius: 20px;
  background-color: #393939; color: #fff;
`;
const SearchButton = styled.button`
  color: #fff;
`;

function AllClubs() {
  const [clubsData, setClubsData] = useState();
  const [searchData, setSearchData] = useState();
  useEffect(() => {
    fetch('http://localhost:5000/clubs', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((mydata) => setClubsData(mydata.slice(0, 5)));
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    // TODO make search here
  };

  return (
    <>
      <form>
        <Ribbon>
          <SearchBox placeholder="Search..." type="search" value={searchData} onChange={(e) => setSearchData(e.target.value)} />
          <SearchButton onClick={(e) => handleClick(e)} type="button"> Search</SearchButton>
        </Ribbon>
      </form>
      <ClubsView width={width} data={clubsData} Container={StyledContainer} />
    </>
  );
}
const StyledContainer = styled.div`
    display:grid;
    grid-template-columns:repeat(5, 1fr);
    grid-gap:40px;
    align-items:center;
`;
export default AllClubs;
