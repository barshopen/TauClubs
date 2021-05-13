// import { Helmet } from 'react-helmet';
import React from 'react';
import { Box, Container } from '@material-ui/core';
import SettingsNotifications from '../components/settings/SettingsNotifications';
import SettingsPassword from '../components/settings/SettingsPassword';

const SettingsView = () => (
  <>
    <Box backgroundColor='background.default' minHeight='100%' py={3}>
      <Container maxWidth='lg'>
        <SettingsNotifications />
        <Box pt={3}>
          <SettingsPassword />
        </Box>
      </Container>
    </Box>
  </>
);

export default SettingsView;
