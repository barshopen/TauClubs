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
    display: 'flex',
    justifyContent: 'space-around',
  },
}));

function NewMessageContnet({ setOpen }) {
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
        Publish New Message
      </Typography>

      <TextField
        id='message-title'
        label='Message Title'
        variant='outlined'
        value={title}
        onChange={handleChangeTitle}
      />
      <TextField
        id='message-content'
        label='Message Content'
        multiline
        variant='outlined'
        value={content}
        onChange={handleChangeContent}
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
        <Button variant='contained' onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

NewMessageContnet.propTypes = {
  setOpen: PropTypes.func.isRequired,
};

function NewMessage({ ClickableTrigger }) {
  return (
    <GenericModal
      ClickableTrigger={ClickableTrigger}
      Content={NewMessageContnet}
    />
  );
}

NewMessage.propTypes = {
  ClickableTrigger: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.shape({ render: PropTypes.func.isRequired }),
  ]).isRequired,
};

export default NewMessage;
