import React, { useEffect, useState } from 'react';
import UserAccount from './User/UserAccount';
import ManagerAccount from './Manager/ManagerAccount';
import { isUserManager } from '../../Shared/api';

const GeneralProfile = () => {
  const [manager, setManager] = useState(false);
  useEffect(() => {
    isUserManager().then(res => {
      setManager(res);
    });
  }, []);
  return manager ? <ManagerAccount /> : <UserAccount />;
};

export default GeneralProfile;
