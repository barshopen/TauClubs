import React from 'react';
//  { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import ProductListToolbar from '../components/product/ProductListToolbar';
import ProductCard from '../components/product/ProductCard';
import products from '../__mocks__/products';

const ProductList = () => (
  <>
    <Box backgroundColor='background.default' minHeight='100%' py={3}>
      <Container maxWidth={false}>
        <ProductListToolbar />
        <Box pt={3}>
          <Grid container spacing={3}>
            {products.map(product => (
              <Grid item key={product.id} lg={4} md={6} xs={12}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box display='flex' justifyContent='center' pt={3}>
          <Pagination color='primary' count={3} size='small' />
        </Box>
      </Container>
    </Box>
  </>
);

export default ProductList;
