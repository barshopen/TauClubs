import React from 'react';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
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
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const LatestJoinedUsers = ({ users }) => (
  <Card>
    <CardHeader title='Latest Applications' />
    <Divider />
    <PerfectScrollbar>
      <Box minWidth={800}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Club</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Application Date</TableCell>
              {/* <TableCell>Status</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow hover key={user.id}>
                <TableCell>
                  <Chip color='primary' label={user.club} size='small' />
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>
                  {moment(user.joinTime).format('DD/MM/YYYY')}
                </TableCell>
                {/* <TableCell>
                    <Chip
                      color='primary'
                      label={user?.status ? 'pending' : 'member'}
                      size='small'
                    /> 
                  </TableCell> */}
              </TableRow>
            ))}
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

LatestJoinedUsers.propTypes = {
  users: PropTypes.node,
};

LatestJoinedUsers.defaultProps = {
  users: {},
};
