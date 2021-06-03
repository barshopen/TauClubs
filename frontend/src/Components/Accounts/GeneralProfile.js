import React from 'react';
import { useQuery } from 'react-query';
import UserAccount from './User/UserAccount';
import ManagerAccount from './Manager/ManagerAccount';
import { isUserManager } from '../../Shared/api';

const GeneralProfile = () => {
  const {
    data: { manager: isManager },
  } = useQuery('isManager', isUserManager);

  // const isManager = true;
  // return isManager ? <ManagerAccount /> : <UserAccount />;
  return null;
};

export default GeneralProfile;
