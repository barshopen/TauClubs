import React, { useState, useEffect } from 'react';
import ClubsView from '../Components/ClubsView';

function AllClubs() {
  const [clubsData, setClubsData] = useState();
  useEffect(() => {
    fetch('https://mockend.com/barshopen/tauclubs/tree/mockend/clubs', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((mydata) => setClubsData(mydata.slice(0, 5)));
  }, []);

  return (
    <ClubsView data={clubsData} />
  );
}

export default AllClubs;
