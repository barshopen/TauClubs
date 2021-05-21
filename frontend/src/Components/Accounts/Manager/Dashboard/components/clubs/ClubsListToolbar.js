import React from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
} from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';

const ClubsListToolbar = props => (
  <Box {...props}>
    <Box style={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box style={{ maxWidth: 500 }}>
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
              placeholder='Search Club'
              variant='outlined'
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
);

export default ClubsListToolbar;
