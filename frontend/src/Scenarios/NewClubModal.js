import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Box, makeStyles } from '@material-ui/core';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ImageUploader from 'react-images-upload';
import Select from 'react-select';
import GenericModal from '../Components/Generic/GenericModal';
import useClubs from '../hooks/useClubs';

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

function NewClubContent({ clubId, setOpen, onChange: handler }) {
  const { id, name, description, contact, title, isImage, existTag } = clubId;
  let present = isImage;
  const classes = useStyles();
  const [values, setValues] = useState({});
  const [tags, setTags] = useState(existTag);
  const { refetchMyClubs } = useClubs();

  const handleTags = selectedOptions => {
    setTags(selectedOptions);
  };

  const handleChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async e => {
    e.preventDefault();
    const tagsArray = tags.map(({ label }) => label);

    const data = new FormData();
    data.append('club_name', values.club_name);
    data.append('description', values.description);
    data.append('contact_mail', values.contact_mail);
    data.append('tags', tagsArray);
    if (values.image) {
      data.append('image', values.image);
    } else {
      data.append('image', 'None');
    }
    await handler(data);
    setOpen(false);
    refetchMyClubs();
  };

  const handleDrop = pictureFiles => {
    present = false;
    setValues({
      ...values,
      image: pictureFiles[0],
    });
  };
  const tagsfunc = tagsList => {
    const arr = [];
    for (let i = 0; i < tagsList.length; i += 1) {
      arr.push({ value: tagsList[i], label: tagsList[i] });
    }
    return arr;
  };

  const options = [
    { value: 'sports', label: 'Sports' },
    { value: 'Dancing', label: 'Dancing' },
    { value: 'Social', label: 'Social' },
    { value: 'Math', label: 'Math' },
    { value: 'Outdoors', label: 'Outdoors' },
    { value: 'Music', label: 'Music' },
    { value: 'Science', label: 'Science' },
    { value: 'Politics', label: 'Politics' },
    { value: 'meditation', label: 'Meditation' },
    { value: 'Food', label: 'Food' },
    { value: 'Cooking', label: 'Cooking' },
    { value: 'architecture', label: 'Architecture' },
    { value: 'history', label: 'History' },
    { value: 'Literature', label: 'Literature' },
    { value: 'poetry', label: 'Poetry' },
    { value: 'Gaming', label: 'Gaming' },
    { value: 'volunteering', label: 'Volunteering' },
  ];

  return (
    <form
      className={classes.root}
      Validate
      autoComplete='on'
      onSubmit={submitHandler}>
      <Typography variant='h6' className={classes.header}>
        {title}
      </Typography>

      <TextField
        name='club_name'
        label={name}
        variant='outlined'
        required={title === 'Create New Club'}
        onChange={handleChange}
      />
      <TextField
        name='contact_mail'
        label={contact}
        variant='outlined'
        required={title === 'Create New Club'}
        onChange={handleChange}
      />
      <TextField
        name='description'
        label={description}
        multiline
        variant='outlined'
        rows={4}
        rowsMax={10}
        required={title === 'Create New Club'}
        onChange={handleChange}
      />
      <Box p={1}>
        <Select
          name='tags'
          backgroundColor='black'
          onChange={handleTags}
          isMulti
          options={tags.length === 5 ? [] : options}
          defaultValue={tagsfunc(tags)}
        />
      </Box>
      <ImageUploader
        withIcon
        withPreview
        singleImage
        buttonText='Pick a profile image'
        defaultImages={present && [`${window.origin}/db/images/${id}`]}
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
  clubId: PropTypes.string.isRequired,
  setOpen: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function NewClubModal({ clubId, ClickableTrigger, handler }) {
  return (
    <GenericModal
      ClickableTrigger={ClickableTrigger}
      Content={NewClubContent}
      onChange={handler}
      clubId={clubId}
    />
  );
}
NewClubModal.propTypes = {
  ClickableTrigger: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.shape({ render: PropTypes.func.isRequired }),
  ]).isRequired,
  handler: PropTypes.func.isRequired,
  clubId: PropTypes.string.isRequired,
};
