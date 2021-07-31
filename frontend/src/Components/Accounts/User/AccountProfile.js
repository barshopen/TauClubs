import React from 'react';
import { useRecoilValue } from 'recoil';

import { Avatar, Box, Card, CardContent, Typography } from '@material-ui/core';
import { currentUser } from '../../../Shared/atoms';

const AccountProfile = props => {
  const current = useRecoilValue(currentUser);

  const user = {
    avatar: current?.picture,
    city: current?.city || '',
    country: 'Israel',
    name: `${current?.firstName} ${current?.lastName}`,
    timezone: 'GTM-7',
  };
  return (
    <Card {...props}>
      <CardContent>
        <Box alignItems='center' display='flex' flexDirection='column'>
          <Avatar
            src={user.avatar}
            height={100}
            width={100}
            style={{ marginBottom: '20px' }}
          />
          <Typography color='textPrimary' gutterBottom variant='h3'>
            {user.name}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
export default AccountProfile;
