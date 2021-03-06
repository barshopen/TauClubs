import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Description() {
  const classes = useStyles();
  const [applicationData, setApplicationData] = useState({});
  const handleChange = event =>
    setApplicationData({
      ...applicationData,
      [event.target.name]: event.target.value,
    });

  return (
    <>
      <Typography variant='h6' gutterBottom>
        Tell us about yourself
      </Typography>
      <Typography variant='h6' gutterBottom className={classes.title}>
        <TextField
          id='outlined-multiline-static'
          multiline
          rows={6}
          onChange={handleChange}
          fullWidth
          variant='outlined'
        />
      </Typography>
    </>
  );
}
