import moment from 'moment';
import React from 'react';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const products = [
  {
    id: 'C47',
    name: 'Dropbox',
    imageUrl: '/static/images/products/product_1.png',
    updatedAt: moment().subtract(2, 'hours'),
  },
  {
    id: 'C37',
    name: 'Medium Corporation',
    imageUrl: '/static/images/products/product_2.png',
    updatedAt: moment().subtract(2, 'hours'),
  },
  {
    id: 'C27',
    name: 'Slack',
    imageUrl: '/static/images/products/product_3.png',
    updatedAt: moment().subtract(3, 'hours'),
  },
  {
    id: 'C17',
    name: 'Lyft',
    imageUrl: '/static/images/products/product_4.png',
    updatedAt: moment().subtract(5, 'hours'),
  },
  {
    id: 'C7',
    name: 'GitHub',
    imageUrl: '/static/images/products/product_5.png',
    updatedAt: moment().subtract(9, 'hours'),
  },
];

const LatestProducts = props => (
  <Card {...props}>
    <CardHeader
      subtitle={`${products.length} in total`}
      title='Latest Products'
    />
    <Divider />
    <List>
      {products.map((product, i) => (
        <ListItem divider={i < products.length - 1} key={product.id}>
          <ListItemAvatar>
            <img
              alt={product.name}
              src={product.imageUrl}
              style={{
                height: 48,
                width: 48,
              }}
            />
          </ListItemAvatar>
          <ListItemText
            primary={product.name}
            secondary={`Updated ${product.updatedAt.fromNow()}`}
          />
          <IconButton edge='end' size='small'>
            <MoreVertIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
    <Divider />
    <Box display='flex' justifyContent='flex-end' p={2}>
      <Button
        color='primary'
        endIcon={<ArrowRightIcon />}
        size='small'
        variant='text'>
        View all
      </Button>
    </Box>
  </Card>
);

export default LatestProducts;
