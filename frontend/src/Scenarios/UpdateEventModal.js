import React, { useState } from 'react';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
// import {
//   DateTimePicker,
//   LocalizationProvider,
//   // AdapterDateFns,
// } from '@material-ui/lab';
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
    marginTop: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-around',
  },
}));

function editEventContent({ clubId, setOpen, onChange: editEvent }) {
  const classes = useStyles();
  const [formValues, setFormValues] = useState({
    event_startDateTime: moment().format(),
    eventId: clubId,
  });

  const handleChange = e =>
    setFormValues(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  const submitHandler = e => {
    e.preventDefault();

    editEvent({ data: formValues });
    setOpen(false);
  };

  return (
    <form
      className={classes.root}
      onSubmit={submitHandler}
      noValidate
      autoComplete='off'>
      <Typography variant='h6' className={classes.header}>
        Edit Event
      </Typography>

      <TextField
        name='event_title'
        label='Event title'
        variant='outlined'
        onChange={handleChange}
      />
      <TextField
        name='event_description'
        label='Event Description'
        multiline
        variant='outlined'
        onChange={handleChange}
        rows={4}
        rowsMax={10}
      />
      <TextField
        name='event_startDateTime'
        label='Start Date'
        type='datetime-local'
        variant='outlined'
        format='MM/dd/yyyy'
        defaultValue={moment().format()}
        onChange={handleChange}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
      {/* 
      <DateTimePicker
        renderInput={props => <TextField {...props} />}
        label='DateTimePicker'
        name='event_startDateTime'
        onChange={handleChange}
      /> */}

      <div className={classes.buttons}>
        <Button type='submit' variant='contained' color='primary'>
          Edit
        </Button>
        <Button variant='contained' onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

editEventContent.propTypes = {
  setOpen: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  clubId: PropTypes.string.isRequired,
};

export default function UpdateEventModal({
  clubId,
  ClickableTrigger,
  editEvent,
}) {
  return (
    <GenericModal
      ClickableTrigger={ClickableTrigger}
      Content={editEventContent}
      onChange={editEvent}
      clubId={clubId}
    />
  );
}

UpdateEventModal.propTypes = {
  ClickableTrigger: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.shape({ render: PropTypes.func.isRequired }),
  ]).isRequired,
  editEvent: PropTypes.func.isRequired,
  clubId: PropTypes.string.isRequired,
};
