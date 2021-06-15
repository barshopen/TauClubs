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

function EditMessageContnet({ clubId, setOpen, onChange: editMessage }) {
  const classes = useStyles();
  const [formValues, setFormValues] = useState({
    messageId: clubId,
  });

  const handleChange = e => {
    setFormValues(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async e => {
    e.preventDefault();
    editMessage({ data: formValues });
    setOpen(false);
  };

  return (
    <form
      className={classes.root}
      onSubmit={submitHandler}
      validate
      autoComplete='off'>
      <Typography variant='h6' className={classes.header}>
        Publish New Message
      </Typography>

      <TextField
        name='message_title'
        label='Message Title'
        variant='outlined'
        onChange={handleChange}
        required
      />
      <TextField
        name='message_content'
        label='Message Content'
        multiline
        variant='outlined'
        onChange={handleChange}
        rows={5}
        rowsMax={10}
        required
      />

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

EditMessageContnet.propTypes = {
  setOpen: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  clubId: PropTypes.string.isRequired,
};

export default function EditMessageModal({
  clubId,
  ClickableTrigger,
  editMessage,
}) {
  return (
    <GenericModal
      ClickableTrigger={ClickableTrigger}
      Content={EditMessageContnet}
      onChange={editMessage}
      clubId={clubId}
    />
  );
}

EditMessageModal.propTypes = {
  ClickableTrigger: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.shape({ render: PropTypes.func.isRequired }),
  ]).isRequired,
  editMessage: PropTypes.func.isRequired,
  clubId: PropTypes.string.isRequired,
};
