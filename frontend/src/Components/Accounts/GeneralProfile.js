import React from 'react';
import UserAccount from './User/UserAccount';
import ManagerAccount from './Manager/ManagerAccount';
import { isUserManager } from '../../Shared/api';

const GeneralProfile = () => {
  const isManager = isUserManager();
  return isManager.manager ? <ManagerAccount /> : <UserAccount />;
};

export default GeneralProfile;
