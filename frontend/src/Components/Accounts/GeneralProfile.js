import React from 'react';
import { useQuery } from 'react-query';
import UserAccount from './User/UserAccount';
import ManagerAccount from './Manager/ManagerAccount';
import { isUserManager } from '../../Shared/api';

const GeneralProfile = () => {
  const { data, error } = useQuery('isUserManager', isUserManager);

  console.log({ data });
  const manager = true;
  return manager ? <ManagerAccount /> : <UserAccount />;
};

export default GeneralProfile;
