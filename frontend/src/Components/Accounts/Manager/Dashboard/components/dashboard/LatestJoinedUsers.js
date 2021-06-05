import React from 'react';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { NavLink } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const orders = [
  {
    id: 'B5',
    ref: 'CDD1049',
    amount: 30.5,
    customer: {
      name: 'Ekaterina Tankova',
    },
    createdAt: 1555016400000,
    status: 'pending',
  },
  {
    id: 'B45',
    ref: 'CDD1048',
    amount: 25.1,
    customer: {
      name: 'Cao Yu',
    },
    createdAt: 1555016400000,
    status: 'delivered',
  },
  {
    id: 'B55',
    ref: 'CDD1047',
    amount: 10.99,
    customer: {
      name: 'Alexa Richardson',
    },
    createdAt: 1554930000000,
    status: 'refunded',
  },
  {
    id: 'B35',
    ref: 'CDD1046',
    amount: 96.43,
    customer: {
      name: 'Anje Keizer',
    },
    createdAt: 1554757200000,
    status: 'pending',
  },
  {
    id: 'B25',
    ref: 'CDD1045',
    amount: 32.54,
    customer: {
      name: 'Clarke Gillebert',
    },
    createdAt: 1554670800000,
    status: 'delivered',
  },
  {
    id: 'B15',
    ref: 'CDD1044',
    amount: 16.76,
    customer: {
      name: 'Adam Denisov',
    },
    createdAt: 1554670800000,
    status: 'delivered',
  },
];

const LatestJoinedUsers = ({ allUsers }) => (
  <Card>
    <CardHeader title='Latest Applications' />
    <Divider />
    <PerfectScrollbar>
      <Box minWidth={800}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell sortDirection='desc'>
                <Tooltip enterDelay={300} title='Sort'>
                  <TableSortLabel active direction='desc'>
                    Application Date
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allUsers?.map(({ users, club }) =>
              users.map(user => (
                <TableRow hover key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>
                    {moment(user.joinTime).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>
                    <Chip
                      color='primary'
                      label={user?.status ? 'pending' : 'member'}
                      size='small'
                    />
                  </TableCell>
                  <TableCell>
                    <Chip color='primary' label={club} size='small' />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Box>
    </PerfectScrollbar>
    <Box display='flex' justifyContent='flex-end' p={2}>
      <NavLink to='/profile/users'>
        <Button
          color='primary'
          endIcon={<ArrowRightIcon />}
          size='small'
          variant='text'>
          View all
        </Button>
      </NavLink>
    </Box>
  </Card>
);

export default LatestJoinedUsers;
