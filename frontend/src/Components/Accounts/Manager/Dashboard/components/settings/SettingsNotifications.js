import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Typography,
} from '@material-ui/core';

const SettingsNotifications = props => (
  <form {...props}>
    <Card>
      <CardHeader
        subheader='Manage the notifications to the users'
        title='Notifications'
      />
      <Divider />
      <CardContent>
        <Grid container spacing={6} wrap='wrap'>
          <Grid
            item
            md={4}
            sm={6}
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
            xs={12}>
            <Typography color='textPrimary' gutterBottom variant='h6'>
              Events
            </Typography>
            <FormControlLabel
              control={<Checkbox color='primary' defaultChecked />}
              label='Web Push Notifications'
            />
            <FormControlLabel
              control={<Checkbox color='primary' />}
              label='Email'
            />
          </Grid>
          <Grid
            item
            md={4}
            sm={6}
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
            xs={12}>
            <Typography color='textPrimary' gutterBottom variant='h6'>
              Messages
            </Typography>
            <FormControlLabel
              control={<Checkbox color='primary' defaultChecked />}
              label='Web Push Notifications'
            />
            <FormControlLabel
              control={<Checkbox color='primary' />}
              label='Email'
            />
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <Box display='flex' justifyContent='flex-end' p={2}>
        <Button color='primary' variant='contained'>
          Save
        </Button>
      </Box>
    </Card>
  </form>
);

export default SettingsNotifications;