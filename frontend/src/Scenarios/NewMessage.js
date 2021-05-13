import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import GenericModal from '../Components/Generic/GenericModal';

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
  },
  header: {
    textAlign: 'center',
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      width: '1000ch',
      display: 'block',
    },
  },
}));

const Line = styled.div`
  display: flex;
  justify-content: space-around;
`;

function NewMessageContnet({ setOpen }) {
  const [value, setValue] = useState('');
  const classes = useStyles();

  const handleChange = e => {
    setValue(e.target.value);
  };
  return (
    <Container className={classes.container} maxWidth='md'>
      <form className={classes.root} noValidate autoComplete='off'>
        <Typography variant='h6' className={classes.header}>
          Publish New Message
        </Typography>

        <TextField
          id='outlined-search'
          label='Message title'
          variant='outlined'
        />
        <TextField
          id='outlined-textarea'
          label='Message Content'
          multiline
          variant='outlined'
          value={value}
          onChange={handleChange}
          rowsMax={10}
        />

        <Line>
          <Button
            variant='contained'
            color='primary'
            onClick={() => setOpen(false)}>
            Create
          </Button>
          <Button variant='contained' onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </Line>
      </form>
    </Container>
  );
}

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
  ]),
};

NewMessage.defaultProps = {
  ClickableTrigger: styled.div``, // a default container
};
export default NewMessage;
