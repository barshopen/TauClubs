import React from 'react';
import UserAccount from './User/UserAccount';
import ManagerAccount from './Manager/ManagerAccount';

const GeneralProfile = () => {
  // need to come from backend
  const isManger = true;
  return isManger ? <ManagerAccount /> : <UserAccount />;
};
export default GeneralProfile;
