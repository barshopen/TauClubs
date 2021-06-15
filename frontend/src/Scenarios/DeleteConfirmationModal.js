import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles } from '@material-ui/core/styles';
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
      <DeleteIcon fontSize='large' />
    </IconButton>
  );
}

ClickableTrigger.propTypes = {
  onClick: PropTypes.func.isRequired,
};

function NewEventContent() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant='h5' align='center'>
        Are yoy sure you want to delete?
      </Typography>
      <ButtonGroup
        color='primary'
        aria-label='outlined primary button group'
        fullWidth>
        <Button>Delete</Button>
        <Button>Cancel</Button>
      </ButtonGroup>
    </div>
  );
}

export default function DeleteConfirmationModal() {
  return (
    <GenericModal
      ClickableTrigger={ClickableTrigger}
      Content={NewEventContent}
    />
  );
}
