import React, { useEffect, useState } from 'react';
import UserAccount from './User/UserAccount';
import ManagerAccount from './Manager/ManagerAccount';
import { isUserManager } from '../../Shared/api';

const GeneralProfile = () => {
  const [isManager, setIsManager] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    isUserManager().then(res => {
      setIsManager(res);
      setLoading(false);
    });
  }, []);

  const { manager } = isManager;

  return !loading && (manager ? <ManagerAccount /> : <UserAccount />);
};
export default GeneralProfile;
