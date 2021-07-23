import React, { useState, useEffect } from 'react';
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
import FilterListIcon from '@material-ui/icons/FilterList';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil';
import { approveUserToClub } from '../../../../../../Shared/api';
import { currentUser } from '../../../../../../Shared/atoms';

const UserListResults = ({ users: allUsers }) => {
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(0);
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);

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
  // eslint-disable-next-line prettier/prettier
  const dictColorByStatus = { "Admin": 'default', "User": 'primary', "Pending": 'secondary' };
  const currentAdmin = useRecoilValue(currentUser);

  return (
    <Card>
      <PerfectScrollbar>
        <Box minWidth={300}>
          <Table>
            <TableHead>
              <TableRow>
                <IconButton aria-label='filter list'>
                  <FilterListIcon />
                </IconButton>
                <IconButton aria-label='delete'>
                  <DeleteIcon />
                </IconButton>
              </TableRow>
              <TableRow>
                <TableCell padding='checkbox'>
                  <Checkbox />
                </TableCell>
                <TableCell>Clubs</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Request/Approve date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Approve</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allUsers?.slice(0, limit).map(({ users, club: { id, name } }) =>
                users
                  .filter(user => user?.contactMail !== currentAdmin.email)
                  .map(user => (
                    <TableRow hover key={`${user.id}-${id}`}>
                      <TableCell padding='checkbox'>
                        <Checkbox />
                      </TableCell>
                      <TableCell>{name}</TableCell>
                      <TableCell>
                        <Box alignItems='center' display='flex'>
                          {user.name}
                        </Box>
                      </TableCell>
                      <TableCell>{user.contactMail}</TableCell>

                      <TableCell>{user?.phone || ''}</TableCell>
                      <TableCell>
                        {user.status === 'Pending' &&
                          moment(user?.requestTime).format('DD/MM/YYYY')}
                        {user.status !== 'Pending' &&
                          moment(user?.approveTime).format('DD/MM/YYYY')}
                      </TableCell>

                      <TableCell>
                        <Chip
                          color={dictColorByStatus[user.status]}
                          label={user?.status}
                          size='small'
                        />
                      </TableCell>

                      <TableCell padding='checkbox'>
                        <Checkbox
                          checked={
                            user?.status !== 'Pending' ||
                            selectedCustomerIds.indexOf(`${user.id}-${id}`) !==
                              -1
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
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
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
