import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import GenericModal from '../Components/Generic/GenericModal';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  buttons: {
    marginTop: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-around',
  },
}));

function NewClubContent({ setOpen }) {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete='off'>
      <Typography variant='h6' className={classes.header}>
        Create New Club
      </Typography>

      <TextField id='club-name' label='Club Name' variant='outlined' />
      <TextField id='contact-email' label='Contact Email' variant='outlined' />
      <TextField
        id='club-description'
        label='Club Description'
        multiline
        variant='outlined'
        rows={4}
        rowsMax={10}
      />
      <div className={classes.buttons}>
        <Button
          variant='contained'
          color='primary'
          onClick={() => setOpen(false)}>
          Publish
        </Button>
      </div>
    </form>
  );
}
NewClubContent.propTypes = {
  setOpen: PropTypes.func.isRequired,
};

function ClickableTrigger({ onClick }) {
  const text = 'Add New Club';
  return (
    <ListItem button key={text} onClick={onClick}>
      <ListItemIcon>
        <AddIcon />
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );
}

ClickableTrigger.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default function NewClubModal() {
  return (
    <GenericModal
      ClickableTrigger={ClickableTrigger}
      Content={NewClubContent}
    />
  );
}
