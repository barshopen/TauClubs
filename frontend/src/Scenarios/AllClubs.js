import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ClubsView from '../Components/ClubsView';

const width = '95%';

function AllClubs() {
  const [clubsData, setClubsData] = useState();
  useEffect(() => {
    fetch('/db/clubs', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(res => res.json())
      .then(mydata => setClubsData(mydata.slice(0, 5)));
  }, []);

  return (
    <>
      <ClubsView width={width} data={clubsData} Container={StyledContainer} />
    </>
  );
}

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 40px;
  align-items: center;
`;
export default AllClubs;
