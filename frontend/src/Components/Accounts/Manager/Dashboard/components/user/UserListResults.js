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
import { useRecoilValue } from 'recoil';
import { DataGrid, GridRowsProp } from '@material-ui/data-grid';
import { approveUserToClub } from '../../../../../../Shared/api';
import { currentUser } from '../../../../../../Shared/atoms';

const UserListResults = ({ users: allUsers }) => {
  const [limit, setLimit] = useState(10);
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
  const newUsers = allUsers.map(({ users, club: { id, name } }) =>
    users.map(user => {
      user.date =
        user.status === 'Pending' ? user?.approveTime : user?.requestTime;
      user.clubName = name;
      return user;
    })
  );
  const columns = [
    {
      field: 'name',
      headerName: 'Member Name',
      width: 200,
    },
    {
      field: 'clubName',
      headerName: 'Club Name',
      width: 200,
    },
    {
      field: 'contactMail',
      headerName: 'Email',
      width: 220,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
    },
    {
      field: 'date',
      headerName: 'Approve/ Request Time',
      renderCell: date => moment(date.formattedValue).format('DD/MM/YYYY'),
      width: 230,
      description: 'Approve date for memebers, Request date for pending users',
    },
  ];

  const rows = newUsers.flat();
  return (
    <div style={{ height: 800, width: '110%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        autoPageSize
        checkboxSelection
        disableSelectionOnClick
        isRowSelectable={params => params.row.status !== 'Admin'}
        loading
      />
    </div>
  );
};

UserListResults.propTypes = {
  users: PropTypes.node.isRequired,
};

export default UserListResults;
