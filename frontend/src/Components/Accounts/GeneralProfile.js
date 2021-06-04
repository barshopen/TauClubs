import React from 'react';
import { useQuery } from 'react-query';
import UserAccount from './User/UserAccount';
import ManagerAccount from './Manager/ManagerAccount';
import { isUserManager } from '../../Shared/api';

const GeneralProfile = () => {
  const {
    data: { manager },
  } = useQuery('isManager', isUserManager);

  return manager ? <ManagerAccount /> : <UserAccount />;
};

export default GeneralProfile;
