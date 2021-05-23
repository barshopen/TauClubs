import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@material-ui/core';

const UserListResults = ({ users, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = event => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = users.map(user => user.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
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

  const getInitials = (name = '') =>
    name
      .replace(/\s+/, ' ')
      .split(' ')
      .slice(0, 2)
      .map(v => v && v[0].toUpperCase())
      .join('');

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Registration date</TableCell>
                <TableCell>Clubs</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Approve</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.slice(0, limit).map(customer => (
                <TableRow
                  hover
                  key={customer.id}
                  selected={selectedCustomerIds.indexOf(customer.id) !== -1}>
                  <TableCell>
                    <Box alignItems='center' display='flex'>
                      <Avatar
                        src={customer.avatarUrl}
                        style={{
                          marginRight: '20px',
                          width: '30px',
                          height: '30px',
                        }}>
                        {getInitials(customer.name)}
                      </Avatar>
                      <Typography color='textPrimary' variant='body1'>
                        {customer.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{`${customer.address.city}`}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>
                    {moment(customer.createdAt).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>{['chess']}</TableCell>
                  <TableCell>
                    <Chip
                      color='primary'
                      label={customer.status}
                      size='small'
                    />
                  </TableCell>

                  <TableCell padding='checkbox'>
                    <Checkbox
                      checked={customer.status === 'Member'}
                      onChange={event => handleSelectOne(event, customer.id)}
                      value='true'
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component='div'
        count={users.length}
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
