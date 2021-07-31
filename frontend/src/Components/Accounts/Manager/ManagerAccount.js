import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import BaseLoader from 'react-loader-spinner';
import DashboardApp from './Dashboard/DashboardApp';
import { getDashboardData } from '../../../Shared/api';

const Loader = styled(BaseLoader)`
  margin-top: 25%;
  display: flex;
  justify-content: center;
`;

const ManagerAccount = () => {
  const storeKey = ['dashboardData'];
  const { data, isLoading } = useQuery(storeKey, getDashboardData, {
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
  });

  return isLoading ? (
    <Loader type='TailSpin' color='#00BFFF' height={100} width={100} />
  ) : (
    <DashboardApp data={data} />
  );
};
export default ManagerAccount;
