import React, { useEffect, useState } from 'react';
import UserAccount from './User/UserAccount';
import ManagerAccount from './Manager/ManagerAccount';
import { isUserManager } from '../../Shared/api';

const GeneralProfile = () => {
  // const [isManager, setIsManager] = useState(false);
  // useEffect(() => {
  //   isUserManager().then(res => {
  //     setIsManager(res);
  //   });
  // }, []);

  // const { manager } = isManager;

  const manager = true;

  return manager ? <ManagerAccount /> : <UserAccount />;
};
export default GeneralProfile;
