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

function NewMessageContnet({ clubId, setOpen, onChange: handler }) {
  const { id, title, content, titleStatus } = clubId;
  const classes = useStyles();
  const [formValues, setFormValues] = useState({
    messageId: id,
  });

  const handleChange = e => {
    setFormValues(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async e => {
    e.preventDefault();
    handler({ data: formValues });
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
        name='message_title'
        label={title}
        variant='outlined'
        onChange={handleChange}
        required={titleStatus === 'Create New Message'}
      />
      <TextField
        name='message_content'
        label={content}
        multiline
        variant='outlined'
        onChange={handleChange}
        rows={5}
        rowsMax={10}
        required={titleStatus === 'Create New Message'}
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
  clubId: PropTypes.string.isRequired,
};

export default function NewMessageModal({ clubId, ClickableTrigger, handler }) {
  return (
    <GenericModal
      ClickableTrigger={ClickableTrigger}
      Content={NewMessageContnet}
      onChange={handler}
      clubId={clubId}
    />
  );
}

NewMessageModal.propTypes = {
  ClickableTrigger: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.shape({ render: PropTypes.func.isRequired }),
  ]).isRequired,
  handler: PropTypes.func.isRequired,
  clubId: PropTypes.string.isRequired,
};
