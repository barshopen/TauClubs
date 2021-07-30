import React, { useState } from 'react';
import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { DataGrid } from '@material-ui/data-grid';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import {
  approveUserUsers,
  unapproveUserUsers,
} from '../../../../../../Shared/api';

function sendApprove(memberships) {
  if (memberships.length > 0) {
    approveUserUsers(memberships);
  }
}
function sendUnApprove(memberships) {
  if (memberships.length > 0) {
    unapproveUserUsers(memberships);
  }
}
const UserListResults = ({ users }) => {
  const [rowsChoose, setRows] = useState([]);
  const newUsers = Array.from(Object.values(users), user => {
    user.date =
      user.status === 'Pending' ? user?.approveTime : user?.requestTime;
    return user;
  });
  const rows = newUsers;
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
  return (
    <div style={{ height: 700, width: '110%' }}>
      <IconButton aria-label='add' onClick={() => sendApprove(rowsChoose)}>
        <AddIcon />
      </IconButton>
      <IconButton aria-label='delete' onClick={() => sendUnApprove(rowsChoose)}>
        <DeleteIcon />
      </IconButton>
      <DataGrid
        rows={rows}
        columns={columns}
        autoPageSize
        checkboxSelection
        onSelectionModelChange={e => setRows(e)}
        disableSelectionOnClick
        isRowSelectable={params => params.row.status !== 'Admin'}
      />
    </div>
  );
};
UserListResults.propTypes = {
  users: PropTypes.node.isRequired,
};
export default UserListResults;
