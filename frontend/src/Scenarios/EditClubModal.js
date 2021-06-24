import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
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
      <EditIcon fontSize='large' />
    </IconButton>
  );
}

ClickableTrigger.propTypes = {
  onClick: PropTypes.func.isRequired,
};

function EditContent({ clubId, setOpen, onChange: editclub }) {
  const classes = useStyles();
  const [formValues, setFormValues] = useState({
    clubId,
  });
  const handleChange = e =>
    setFormValues(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  const submitHandler = e => {
    e.preventDefault();
    editclub(clubId);
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <Typography variant='h5' align='center'>
        Edit Club
      </Typography>
      <ButtonGroup
        color='primary'
        aria-label='outlined primary button group'
        fullWidth>
        <Button onClick={submitHandler}>Send</Button>
        <Button onClick={() => setOpen(false)}>Cancel </Button>
      </ButtonGroup>
    </div>
  );
}

EditContent.propTypes = {
  clubId: PropTypes.string.isRequired,
  setOpen: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function EditClubModal({ clubId, editHandler }) {
  return (
    <GenericModal
      ClickableTrigger={ClickableTrigger}
      Content={EditContent}
      onChange={editHandler}
      clubId={clubId}
    />
  );
}
EditClubModal.propTypes = {
  clubId: PropTypes.string.isRequired,
  editHandler: PropTypes.func.isRequired,
};
