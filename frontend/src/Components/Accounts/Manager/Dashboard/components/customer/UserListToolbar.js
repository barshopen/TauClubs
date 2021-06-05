import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
} from '@material-ui/core';
import React from 'react';
import { Search as SearchIcon } from 'react-feather';

const UserListToolbar = props => (
  <Box {...props}>
    <Box display='flex' justifyContent='flex-end' />
    <Box mt={3}>
      <Card>
        <CardContent>
          <Box maxWidth={500}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SvgIcon fontSize='small' color='action'>
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                ),
              }}
              placeholder='Search User'
              variant='outlined'
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
);

export default UserListToolbar;
