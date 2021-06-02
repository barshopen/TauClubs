import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
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
    marginTop: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-around',
  },
}));

function NewMessageContnet({ setOpen, onChange: addMessage }) {
  const classes = useStyles();
  const [formValues, setFormValues] = useState({});

  const handleChange = e => {
    setFormValues(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async e => {
    e.preventDefault();
    addMessage({ data: formValues });
    setOpen(false);
  };

  return (
    <form
      className={classes.root}
      onSubmit={submitHandler}
      noValidate
      autoComplete='off'>
      <Typography variant='h6' className={classes.header}>
        Publish New Message
      </Typography>

      <TextField
        name='message_title'
        label='Message Title'
        variant='outlined'
        onChange={handleChange}
      />
      <TextField
        name='message_content'
        label='Message Content'
        multiline
        variant='outlined'
        onChange={handleChange}
        rows={4}
        rowsMax={10}
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

NewMessageContnet.propTypes = {
  setOpen: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function NewMessageModal({ ClickableTrigger, addMessage }) {
  return (
    <GenericModal
      ClickableTrigger={ClickableTrigger}
      Content={NewMessageContnet}
      onChange={addMessage}
    />
  );
}

NewMessageModal.propTypes = {
  ClickableTrigger: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.shape({ render: PropTypes.func.isRequired }),
  ]).isRequired,
  addMessage: PropTypes.func.isRequired,
};
