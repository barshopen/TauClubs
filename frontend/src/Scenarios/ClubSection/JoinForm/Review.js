import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review() {
  const classes = useStyles();

  return (
    <>
      <Typography variant='h6' gutterBottom>
        Hello thank you for...
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant='h6' gutterBottom className={classes.title}>
            Status
          </Typography>
          <Typography gutterBottom>pending..</Typography>
        </Grid>
        <Grid item container direction='column' xs={12} sm={6}>
          <Typography variant='h6' gutterBottom className={classes.title}>
            Happy Photo
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
