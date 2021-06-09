import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ImageUploader from 'react-images-upload';
import GenericModal from '../Components/Generic/GenericModal';
import { createClub } from '../Shared/api';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  buttons: {
    marginTop: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-around',
  },
}));

function NewClubContent({ setOpen }) {
  const classes = useStyles();
  const [values, setValues] = useState({});

  const handleChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleDrop = pictureFiles => {
    // setPicture(URL.createObjectURL(pictureFiles[0]));
    setValues({
      ...values,
      image: pictureFiles[0],
    });
  };

  const submitHandler = e => {
    e.preventDefault();
    const data = new FormData();
    data.append('club_name', values.club_name);
    data.append('description', values.description);
    data.append('contact_mail', values.contact_mail);
    data.append('image', values.image);
    createClub(data);
    setOpen(false);
  };

  return (
    <form
      className={classes.root}
      Validate
      autoComplete='on'
      onSubmit={submitHandler}>
      <Typography variant='h6' className={classes.header}>
        Create New Club
      </Typography>
      <TextField
        name='club_name'
        label='Club Name'
        placeholder='Enter club name'
        variant='outlined'
        required
        onChange={handleChange}
      />
      <TextField
        name='contact_mail'
        label='Contact Email'
        placeholder='Enter Contact Mail'
        variant='outlined'
        required
        onChange={handleChange}
      />
      <TextField
        name='description'
        label='Club Description'
        placeholder='Enter club description'
        multiline
        variant='outlined'
        rows={4}
        rowsMax={10}
        required
        onChange={handleChange}
      />
      <ImageUploader
        withIcon
        withPreview
        singleImage
        buttonText='Pick a profile image'
        onChange={handleDrop}
        imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
        maxFileSize={5242880}
      />
      <div className={classes.buttons}>
        <Button variant='contained' color='primary' type='submit'>
          Publish
        </Button>
      </div>
    </form>
  );
}
NewClubContent.propTypes = {
  setOpen: PropTypes.func.isRequired,
};

function ClickableTrigger({ onClick }) {
  const text = 'Add New Club';
  return (
    <ListItem button key={text} onClick={onClick}>
      <ListItemIcon>
        <AddIcon />
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );
}

ClickableTrigger.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default function NewClubModal() {
  return (
    <GenericModal
      ClickableTrigger={ClickableTrigger}
      Content={NewClubContent}
    />
  );
}
