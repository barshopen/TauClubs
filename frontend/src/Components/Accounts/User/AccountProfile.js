import React from 'react';
import moment from 'moment';
import { useRecoilValue } from 'recoil';

import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from '@material-ui/core';
import { currentUser } from '../../../Shared/atoms';

const AccountProfile = props => {
  const current = useRecoilValue(currentUser);
  const user = {
    avatar: current?.picture,
    city: 'Tel aviv',
    country: 'Israel',
    name: `${current?.firstName} ${current?.lastName}`,
    timezone: 'GTM-7',
  };
  return (
    <Card {...props}>
      <CardContent>
        <Box alignItems='center' display='flex' flexDirection='column'>
          <Avatar src={user.avatar} height={100} width={100} />
          <Typography color='textPrimary' gutterBottom variant='h3'>
            {user.name}
          </Typography>
          <Typography color='textSecondary' variant='body1'>
            {`${user.city} ${user.country}`}
          </Typography>
          <Typography color='textSecondary' variant='body1'>
            {`${moment().format('hh:mm A')} `}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color='primary' fullWidth variant='text'>
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
};
export default AccountProfile;
