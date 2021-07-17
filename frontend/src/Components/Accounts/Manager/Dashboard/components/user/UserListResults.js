import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  Chip,
  Checkbox,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core';
import { approveUserToClub } from '../../../../../../Shared/api';

const UserListResults = ({ users: allUsers }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);

  console.log({ allUsers });

  const handleSelectOne = id => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(1)
      );
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = event => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
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
                <TableCell>Status</TableCell>
                <TableCell>Approve</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allUsers?.slice(0, limit).map(({ users, club: { id, name } }) =>
                users.map(user => (
                  <TableRow hover key={`${user.id}-${id}`}>
                    <TableCell>{name}</TableCell>
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

                    <TableCell>
                      <Chip
                        color='primary'
                        label={user?.status || 'member'}
                        size='small'
                      />
                    </TableCell>

                    <TableCell padding='checkbox'>
                      <Checkbox
                        checked={
                          user?.status === 'Member' ||
                          selectedCustomerIds.indexOf(`${user.id}-${id}`) !== -1
                        }
                        onChange={() => {
                          handleSelectOne(`${user.id}-${id}`);
                          approveUserToClub({
                            userId: user.id,
                            clubId: id,
                          });
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component='div'
        count={allUsers.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

UserListResults.propTypes = {
  users: PropTypes.node.isRequired,
};

export default UserListResults;
