import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Box, makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ImageUploader from 'react-images-upload';
import Select from 'react-select';
import GenericModal from '../Components/Generic/GenericModal';
import useConfetti from '../hooks/useConfetti';

const options = [
  'sports',
  'dancing',
  'social',
  'math',
  'outdoors',
  'music',
  'science',
  'politics',
  'meditation',
  'food',
  'cooking',
  'architecture',
  'history',
  'literature',
  'poetry',
  'gaming',
  'volunteering',
];

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

function NewClubContent({ clubId, setOpen, onChange: handler, refetch }) {
  const { id, name, description, contact, title, isImage, existTag } = clubId;
  const classes = useStyles();
  const [values, setValues] = useState({
    clubId: id,
  });
  const [tags, setTags] = useState(existTag);
  const [done, setDone] = useState(false);

  const { Confetti } = useConfetti();

  const [currentImage, setCurrentImage] = useState(isImage);

  const image = useMemo(() => [`${window.origin}/db/images/${id}`], [id]);

  const handleTags = selectedOptions => {
    setTags(selectedOptions.map(({ label }) => label));
  };
  const handleChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async e => {
    e.preventDefault();
    const data = new FormData();
    data.append('clubId', values.clubId);
    data.append('club_name', values.club_name);
    data.append('description', values.description);
    data.append('contact_mail', values.contact_mail);
    data.append('tags', tags);
    if (values.image) {
      data.append('image', values.image);
    } else {
      data.append('image', 'None');
    }
    setDone(true);
    await handler(data);
    setOpen(false);
    refetch?.();
  };

  const handleDrop = pictureFiles => {
    setCurrentImage(false);
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

  return (
    <div>
      <form
        className={classes.root}
        Validate
        autoComplete='on'
        onSubmit={submitHandler}>
        <Typography variant='h4' className={classes.header} align='center'>
          {title}
        </Typography>

        <TextField
          name='club_name'
          label='Club Name'
          defaultValue={name}
          variant='outlined'
          required={title === 'Create New Club'}
          inputProps={{ maxLength: 24 }}
          onChange={handleChange}
        />
        <TextField
          name='contact_mail'
          label='Club Contact Email'
          defaultValue={contact}
          variant='outlined'
          required={title === 'Create New Club'}
          inputProps={{
            pattern: '[a-zA-Z0-9._%+-]+@[a-z0-9.-]+.[a-zA-Z]{2,4}',
          }}
          onChange={handleChange}
        />
        <TextField
          name='description'
          label='Club Description'
          defaultValue={description}
          multiline
          variant='outlined'
          rows={4}
          rowsMax={10}
          required={title === 'Create New Club'}
          onChange={handleChange}
        />
        <TextField
          name='WhatsAppGroup'
          label='WhatsApp group link'
          defaultValue=''
          variant='outlined'
          onChange={handleChange}
        />
        <TextField
          name='FacebookGroup'
          label='Facebook group link'
          defaultValue=''
          variant='outlined'
          onChange={handleChange}
        />
        <Box p={1}>
          <Select
            name='tags'
            backgroundColor='black'
            onChange={handleTags}
            isMulti
            options={
              tags.length === 5
                ? []
                : options.map(label => ({
                    value: label,
                    label,
                  }))
            }
            defaultValue={tagsfunc(tags)}
          />
        </Box>
        <ImageUploader
          withIcon
          withPreview
          singleImage
          buttonText='Pick a profile image'
          defaultImages={currentImage ? image : undefined}
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
      {done && <Confetti />}
    </div>
  );
}
NewClubContent.propTypes = {
  clubId: PropTypes.string.isRequired,
  setOpen: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default function NewClubModal({
  clubId,
  ClickableTrigger,
  handler,
  refetch,
}) {
  return (
    <GenericModal
      ClickableTrigger={ClickableTrigger}
      Content={NewClubContent}
      onChange={handler}
      clubId={clubId}
      refetch={refetch}
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
  refetch: PropTypes.func.isRequired,
  clubId: PropTypes.string.isRequired,
};
