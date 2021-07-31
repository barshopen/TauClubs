import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import GenericModal from '../Components/Generic/GenericModal';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& > *': {
        margin: theme.spacing(2),
      },
    },
  })
);

function ClickableTrigger({ onClick }) {
  return (
    <IconButton onClick={onClick}>
      <Tooltip title='Delete'>
        <DeleteIcon fontSize='large' color='black' />
      </Tooltip>
    </IconButton>
  );
}

ClickableTrigger.propTypes = {
  onClick: PropTypes.func.isRequired,
};

function NewEventContent({ clubId, setOpen, onChange: deleteHandler }) {
  const classes = useStyles();
  const submitHandler = e => {
    e.preventDefault();
    deleteHandler(clubId);
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <Typography variant='h5' align='center'>
        Are yoy sure you want to delete?
      </Typography>
      <ButtonGroup
        color='primary'
        aria-label='outlined primary button group'
        fullWidth>
        <Button onClick={submitHandler}>Delete</Button>
        <Button onClick={() => setOpen(false)}>Cancel </Button>
      </ButtonGroup>
    </div>
  );
}

NewEventContent.propTypes = {
  clubId: PropTypes.string.isRequired,
  setOpen: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function DeleteConfirmationModal({ id, deleteHandler }) {
  return (
    <GenericModal
      ClickableTrigger={ClickableTrigger}
      Content={NewEventContent}
      onChange={deleteHandler}
      clubId={id}
    />
  );
}
DeleteConfirmationModal.propTypes = {
  id: PropTypes.string.isRequired,
  deleteHandler: PropTypes.func.isRequired,
};
