import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ImageUploader from 'react-images-upload';
import GenericModal from '../Components/Generic/GenericModal';
import { addImage } from '../Shared/api';
import useClub from '../hooks/useClub';

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

function UploadImageContent({ clubId, setOpen }) {
  const classes = useStyles();
  const [picture, setPicture] = useState(null);
  const { refetchUseClub } = useClub(clubId);

  const submitHandler = e => {
    e.preventDefault();
    const data = new FormData();
    data.append('clubId', clubId);
    if (picture === null) {
      /// error
      return;
    }
    data.append('image', picture);
    addImage(data).then(() => refetchUseClub());
    setOpen(false);
  };

  const handleDrop = pictureFiles => {
    setPicture(pictureFiles[0]);
  };
  return (
    <form
      className={classes.root}
      Validate
      autoComplete='on'
      onSubmit={submitHandler}>
      <Typography variant='h6' className={classes.header}>
        Add Image
      </Typography>

      <ImageUploader
        withIcon
        withPreview
        singleImage
        buttonText='Pick a profile image'
        onChange={handleDrop}
        isRequired
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
UploadImageContent.propTypes = {
  setOpen: PropTypes.func.isRequired,
  clubId: PropTypes.string.isRequired,
};

export default function UploadImageModal({ clubId, ClickableTrigger }) {
  return (
    <GenericModal
      ClickableTrigger={ClickableTrigger}
      Content={UploadImageContent}
      clubId={clubId}
    />
  );
}
UploadImageModal.propTypes = {
  ClickableTrigger: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.shape({ render: PropTypes.func.isRequired }),
  ]).isRequired,
  clubId: PropTypes.string.isRequired,
};
UploadImageModal.defaultProps = {};
