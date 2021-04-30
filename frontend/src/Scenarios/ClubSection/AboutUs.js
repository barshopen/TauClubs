import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { getClubs } from '../../Shared/api';

const ContainerOuter = styled.div`
  margin: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

function AboutUs() {
  const {
    params: { clubId },
  } = useRouteMatch('/club/*/:clubId');
  const [clubData, setClubData] = useState();

  useEffect(() => {
    getClubs(clubId).then(mydata => setClubData(mydata));
  }, [clubId]);
  useEffect(() => {}, [clubData]);
  return <ContainerOuter>{clubData?.description}</ContainerOuter>;
}

export default AboutUs;
