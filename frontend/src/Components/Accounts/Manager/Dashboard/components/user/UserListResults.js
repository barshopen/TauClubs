import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';

const UserListResults = ({ users: allUsers }) => (
  // const handleSelectOne = (event, id) => {
  //   const selectedIndex = selectedCustomerIds.indexOf(id);
  //   let newSelectedCustomerIds = [];

  //   if (selectedIndex === -1) {
  //     newSelectedCustomerIds = newSelectedCustomerIds.concat(
  //       selectedCustomerIds,
  //       id
  //     );
  //   } else if (selectedIndex === 0) {
  //     newSelectedCustomerIds = newSelectedCustomerIds.concat(
  //       selectedCustomerIds.slice(1)
  //     );
  //   } else if (selectedIndex === selectedCustomerIds.length - 1) {
  //     newSelectedCustomerIds = newSelectedCustomerIds.concat(
  //       selectedCustomerIds.slice(0, -1)
  //     );
  //   } else if (selectedIndex > 0) {
  //     newSelectedCustomerIds = newSelectedCustomerIds.concat(
  //       selectedCustomerIds.slice(0, selectedIndex),
  //       selectedCustomerIds.slice(selectedIndex + 1)
  //     );
  //   }

  //   setSelectedCustomerIds(newSelectedCustomerIds);
  // };

  // const getInitials = (name = '') =>
  //   name
  //     .replace(/\s+/, ' ')
  //     .split(' ')
  //     .slice(0, 2)
  //     .map(v => v && v[0].toUpperCase())
  //     .join('');

  <Card>
    <PerfectScrollbar>
      <Box minWidth={300}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Clubs</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Registration date</TableCell>
              {/* <TableCell>Status</TableCell>
                <TableCell>Approve</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {allUsers?.map(({ users, club }) =>
              users.map(user => (
                <TableRow
                  hover
                  key={user.id}
                  // selected={selectedCustomerIds.indexOf(user.id) !== -1}
                >
                  <TableCell>{club}</TableCell>
                  <TableCell>
                    <Box alignItems='center' display='flex'>
                      {user.name}
                    </Box>
                  </TableCell>
                  <TableCell>{user.contactMail}</TableCell>

                  <TableCell>{user?.phone || ''}</TableCell>
                  <TableCell>
                    {moment(user?.joinTime).format('DD/MM/YYYY')}
                  </TableCell>

                  {/* <TableCell>
                      <Chip
                        color='primary'
                        label={user?.status || 'member'}
                        size='small'
                      />
                    </TableCell>

                    <TableCell padding='checkbox'>
                      <Checkbox
                        checked={user?.status === 'Member'}
                        onChange={event => handleSelectOne(event, user?.id)}
                        value='true'
                      />
                    </TableCell> */}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Box>
    </PerfectScrollbar>
  </Card>
);
UserListResults.propTypes = {
  users: PropTypes.node.isRequired,
};

export default UserListResults;
