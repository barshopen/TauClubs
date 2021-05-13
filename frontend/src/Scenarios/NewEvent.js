import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import GenericModal from '../Components/Generic/GenericModal';

const useStyles = makeStyles(theme => ({
  header: {
    textAlign: 'center',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-around',
  },
}));

function NewEventContent({ setOpen }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const classes = useStyles();

  const handleChangeTitle = e => {
    setTitle(e.target.value);
  };
  const handleChangeContent = e => {
    setContent(e.target.value);
  };
  return (
    <form className={classes.root} noValidate autoComplete='off'>
      <Typography variant='h6' className={classes.header}>
        Create New Event
      </Typography>

      <TextField
        id='event-title'
        label='Event title'
        variant='outlined'
        value={title}
        onChange={handleChangeTitle}
      />
      <TextField
        id='event-description'
        label='Event Description'
        multiline
        variant='outlined'
        value={content}
        onChange={handleChangeContent}
        rows={4}
        rowsMax={10}
      />
      <TextField
        id='datetime-picker'
        label='Start Date'
        type='datetime-local'
        variant='outlined'
        defaultValue='2017-05-24T10:30'
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <div className={classes.buttons}>
        <Button
          variant='contained'
          color='primary'
          onClick={() => setOpen(false)}>
          Publish
        </Button>
        <Button variant='contained' onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
NewEventContent.propTypes = {
  setOpen: PropTypes.func.isRequired,
};

function NewEvent({ ClickableTrigger }) {
  return (
    <GenericModal
      ClickableTrigger={ClickableTrigger}
      Content={NewEventContent}
    />
  );
}

NewEvent.propTypes = {
  ClickableTrigger: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.shape({ render: PropTypes.func.isRequired }),
  ]),
};

NewEvent.defaultProps = {
  ClickableTrigger: styled.div``, // a default container
};

export default NewEvent;
