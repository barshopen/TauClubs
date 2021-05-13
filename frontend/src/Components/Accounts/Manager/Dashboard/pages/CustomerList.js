import React from 'react';
// import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import CustomerListResults from '../components/customer/CustomerListResults';
import CustomerListToolbar from '../components/customer/CustomerListToolbar';
import customers from '../__mocks__/customers';

const CustomerList = () => (
  <>
    <Box backgroundColor='background.default' minHeight='100%' py={3}>
      <Container maxWidth={false}>
        <CustomerListToolbar />
        <Box pt={3}>
          <CustomerListResults customers={customers} />
        </Box>
      </Container>
    </Box>
  </>
);

export default CustomerList;
