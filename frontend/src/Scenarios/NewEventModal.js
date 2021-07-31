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

function NewEventContent({ clubId, setOpen, onChange: addEvent }) {
  const {
    id,
    title,
    description,
    location,
    titleStatus,
    startTime,
    endTime,
  } = clubId;

  const classes = useStyles();
  const [formValues, setFormValues] = useState({
    eventId: id,
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
        {titleStatus}
      </Typography>

      <TextField
        name='event_title'
        label='Event Title'
        defaultValue={title}
        variant='outlined'
        onChange={handleChange}
        required={titleStatus === 'Create New Event'}
      />
      <TextField
        name='event_description'
        label='Event Description'
        defaultValue={description}
        multiline
        variant='outlined'
        onChange={handleChange}
        rows={5}
        rowsMax={10}
        required={titleStatus === 'Create New Event'}
      />
      <TextField
        name='event_location'
        label='Event Loaction'
        defaultValue={location}
        variant='outlined'
        onChange={handleChange}
        required={titleStatus === 'Create New Event'}
      />
      <TextField
        name='event_startDateTime'
        label='Start Date'
        type='datetime-local'
        variant='outlined'
        defaultValue={moment(startTime).format('YYYY-MM-DD[T]HH:mm')}
        onChange={handleChange}
        className={classes.textField}
        inputProps={{
          min: moment().format('YYYY-MM-DD[T]HH:mm'),
        }}
        InputLabelProps={{
          shrink: true,
        }}
        required={titleStatus === 'Create New Event'}
      />
      <TextField
        name='event_endDateTime'
        label='End Date'
        type='datetime-local'
        variant='outlined'
        defaultValue={moment(endTime).format('YYYY-MM-DD[T]HH:mm')}
        onChange={handleChange}
        className={classes.textField}
        inputProps={{
          min: moment().format('YYYY-MM-DD[T]HH:mm'),
        }}
        InputLabelProps={{
          shrink: true,
        }}
        required={titleStatus === 'Create New Event'}
      />

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
  clubId: PropTypes.string.isRequired,
};

export default function NewEventModal({ ClickableTrigger, handler, clubId }) {
  return (
    <GenericModal
      clubId={clubId}
      ClickableTrigger={ClickableTrigger}
      Content={NewEventContent}
      onChange={handler}
    />
  );
}

NewEventModal.propTypes = {
  clubId: PropTypes.string.isRequired,
  ClickableTrigger: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.shape({ render: PropTypes.func.isRequired }),
  ]).isRequired,
  handler: PropTypes.func.isRequired,
};
