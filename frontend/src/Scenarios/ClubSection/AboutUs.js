import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';

function AboutUs() {
  const { params: { clubId } } = useRouteMatch('/club/*/:clubId');
  const [clubData, setClubData] = useState();

  useEffect(() => {
    fetch(`http://localhost:5000/clubs/${clubId}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((mydata) => setClubData(mydata));
  }, [clubId]);
  useEffect(() => {
  }, [clubData]);
  return (
    <>
      {clubData?.description}
    </>
  );
}

export default AboutUs;
