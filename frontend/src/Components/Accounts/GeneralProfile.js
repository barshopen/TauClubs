import React from 'react';
import { useQuery } from 'react-query';
import UserAccount from './User/UserAccount';
import ManagerAccount from './Manager/ManagerAccount';
import { isUserManager } from '../../Shared/api';

const checkIfUserIsManager = async () => {
  const res = await isUserManager();
  return res;
};

const GeneralProfile = () => {
  const {
    data: { manager: isManager },
  } = useQuery('isManager', checkIfUserIsManager);

  return isManager ? <ManagerAccount /> : <UserAccount />;
};

export default GeneralProfile;
