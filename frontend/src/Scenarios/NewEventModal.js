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

function NewEventContent({ setOpen, onChange: addEvent }) {
  const classes = useStyles();
  const [formValues, setFormValues] = useState({
    event_startDateTime: moment().format(),
  });

  const handleChange = e =>
    setFormValues(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  const submitHandler = e => {
    e.preventDefault();
    addEvent({ data: formValues });
    setOpen(false);
  };

  return (
    <form
      className={classes.root}
      onSubmit={submitHandler}
      validate
      autoComplete='off'>
      <Typography variant='h6' className={classes.header}>
        Create New Event
      </Typography>

      <TextField
        name='event_title'
        label='Event title'
        variant='outlined'
        onChange={handleChange}
        required
      />
      <TextField
        name='event_description'
        label='Event Description'
        multiline
        variant='outlined'
        onChange={handleChange}
        rows={5}
        rowsMax={10}
        required
      />
      <TextField
        name='event_location'
        label='Event Location'
        variant='outlined'
        onChange={handleChange}
        required
      />
      <TextField
        name='event_startDateTime'
        label='Start Date'
        type='datetime-local'
        variant='outlined'
        format='MM/dd/yyyy'
        disablePast
        defaultValue={moment().format()}
        onChange={handleChange}
        className={classes.textField}
        inputProps={{
          min: moment().format('YYYY-MM-DD[T]HH:mm'),
        }}
        InputLabelProps={{
          shrink: true,
        }}
        required
      />
      <TextField
        name='event_duration'
        label='Event Duration'
        variant='outlined'
        type='time'
        defaultValue='02:00'
        step='3000'
        onChange={handleChange}
        required
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
  onChange: PropTypes.func.isRequired,
};

export default function NewEventModal({ ClickableTrigger, addEvent }) {
  return (
    <GenericModal
      ClickableTrigger={ClickableTrigger}
      Content={NewEventContent}
      onChange={addEvent}
    />
  );
}

NewEventModal.propTypes = {
  ClickableTrigger: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.shape({ render: PropTypes.func.isRequired }),
  ]).isRequired,
  addEvent: PropTypes.func.isRequired,
};
