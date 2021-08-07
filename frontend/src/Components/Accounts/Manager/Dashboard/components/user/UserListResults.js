/* eslint-disable react/prop-types */
import React, { useState, useMemo } from 'react';
import moment from 'moment';
import { DataGrid } from '@material-ui/data-grid';
import PropTypes from 'prop-types';
import { useQueryClient } from 'react-query';
import { Tooltip, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import { useRecoilValue } from 'recoil';
import {
  approveUserUsers,
  unapproveUserUsers,
} from '../../../../../../Shared/api';
import { currentUser } from '../../../../../../Shared/atoms';
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
              user.status === 'Pending' ? user?.requestTime : user?.approveTime,
            isApproved: user.status !== 'Pending',
          }))
        : [],
    [users]
  );

  const columns = [
    {
      field: 'name',
      headerName: 'Member Name',
      renderCell: ({ row, formattedValue }) => (
        <Tooltip title={lastAdmin(row) ? "Last admin can't leave" : ''}>
          <Typography variant='h5'>{formattedValue}</Typography>
        </Tooltip>
      ),
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
  const current = useRecoilValue(currentUser);

  function allowApprove(row) {
    if (
      (rowsChoose.length === 0 ||
        (rowsChoose.length === 1 && rowsChoose[0] === row.id)) &&
      (row?.status !== 'Admin' ||
        (row?.contactMail === current?.email && !lastAdmin(row)))
    ) {
      return true;
    }
    return false;
  }

  function lastAdmin(admin) {
    if (
      newUsers?.filter(
        user => user.club === admin.club && user.status === 'Admin'
      ).length === 1
    ) {
      return true;
    }
    return false;
  }

  return (
    <div style={{ height: '700px', width: '100%' }}>
      <Typography variant='h2'>Users</Typography>
      <Typography style={{ marginTop: '20px' }} variant='h5'>
        Approve/Decline pending requests of users, and make admin/remove member
        from club
      </Typography>
      <Button
        disabled={
          rowsChoose.length === 0 ||
          newUsers.find(user => user.id === rowsChoose[0]).status === 'Admin'
        }
        onClick={() => sendApprove(rowsChoose)}
        variant='contained'
        color='primary'>
        <Typography variant='h5'>Approve / make admin </Typography>
        <CheckIcon
          style={{
            color: 'white',
            marginLeft: '12px',
          }}
        />
      </Button>
      <Button
        disabled={rowsChoose.length === 0}
        style={{ margin: '20px' }}
        onClick={() => sendUnApprove(rowsChoose)}
        variant='contained'
        color='primary'>
        <Typography variant='h5'>Decline / remove member </Typography>
        <ClearIcon style={{ color: 'white', marginLeft: '12px' }} />
      </Button>
      <DataGrid
        rows={newUsers}
        columns={columns}
        autoPageSize
        loading={!users}
        checkboxSelection
        disableColumnSelector
        onSelectionModelChange={e => setRows(e)}
        disableSelectionOnClick
        isCellEditable={false}
        isRowSelectable={({ row }) => allowApprove(row)}
      />
      {done && <Confetti />}
    </div>
  );
};
UserListResults.propTypes = {
  users: PropTypes.node.isRequired,
};
export default UserListResults;
