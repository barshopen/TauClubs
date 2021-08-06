/* eslint-disable react/prop-types */
import React, { useState, useMemo } from 'react';
import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import { DataGrid } from '@material-ui/data-grid';
import PropTypes from 'prop-types';
import { useQueryClient } from 'react-query';
import { Tooltip, Typography } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import {
  approveUserUsers,
  unapproveUserUsers,
} from '../../../../../../Shared/api';
import useConfetti from '../../../../../../hooks/useConfetti';

const UserListResults = ({ users }) => {
  const [rowsChoose, setRows] = useState([]);
  const [done, setDone] = useState(false);

  const { Confetti } = useConfetti();
  const queryClient = useQueryClient();

  const sendApprove = async () => {
    if (rowsChoose.length > 0) {
      setDone(true);
      await approveUserUsers(rowsChoose);
      queryClient.refetchQueries(['dashboardData']);
      setDone(false);
    }
  };

  const sendUnApprove = async () => {
    if (rowsChoose.length > 0) {
      await unapproveUserUsers(rowsChoose);
      queryClient.refetchQueries(['dashboardData']);
    }
  };

  const newUsers = useMemo(
    () =>
      users
        ? Object.values(users).map(user => ({
            ...user,
            displayDate:
              user.status === 'Pending' ? user?.approveTime : user?.requestTime,
            isApproved: user.status !== 'Pending',
          }))
        : [],
    [users]
  );

  const columns = [
    {
      field: 'name',
      headerName: 'Member Name',
      width: 200,
    },
    {
      field: 'club',
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
      width: 100,
    },
    {
      field: 'displayDate',
      headerName: 'Approve/ Request Date',
      renderCell: ({ row, formattedValue }) => (
        <Tooltip title={row.isApproved ? 'Approve Date' : 'Request Date'}>
          <Typography variant='h5'>
            {moment(formattedValue).format('DD/MM/YYYY')}
          </Typography>
        </Tooltip>
      ),
      width: 210,
      description: 'Approve date for memebers, Request date for pending users',
    },
  ];
  return (
    <div style={{ height: '700px', width: '100%' }}>
      <Typography variant='h2'>Users</Typography>
      <Typography style={{ marginTop: '20px' }} variant='h5'>
        Approve/Decline pending requests of users, and approve/decline current
        users request to be admin
      </Typography>
      <IconButton
        style={{
          marginRight: '20px',
          marginBottom: '20px',
          marginTop: '20px',
          padding: '0',
        }}
        onClick={() => sendApprove(rowsChoose)}>
        <Typography variant='h5'>Approve selected / make admin </Typography>
        <CheckIcon
          style={{
            color: 'green',
            marginLeft: '5px',
          }}
        />
      </IconButton>
      <IconButton
        style={{
          marginRight: '20px',
          marginBottom: '20px',
          marginTop: '20px',
          padding: '0',
        }}
        onClick={() => sendUnApprove(rowsChoose)}>
        <Typography variant='h5'>Decline selected </Typography>
        <ClearIcon style={{ color: 'red', marginLeft: '5px' }} />
      </IconButton>
      <DataGrid
        rows={newUsers}
        columns={columns}
        autoPageSize
        loading={!users}
        disableColumnMenu
        checkboxSelection
        disableColumnSelector
        onSelectionModelChange={e => setRows(e)}
        disableSelectionOnClick
        isCellEditable={false}
        isRowSelectable={({ row }) => row?.status !== 'Admin'}
      />
      {done && <Confetti />}
    </div>
  );
};
UserListResults.propTypes = {
  users: PropTypes.node.isRequired,
};
export default UserListResults;
