import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';

const Form = ({
  handleSubmit,
  setUserData,
  setApprovedUsingPrivateData,
  approvedUsingPrivateData,
}) => {
  const handleChange = event =>
    setUserData(data => ({ ...data, [event.target.name]: event.target.value }));

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant='h6' gutterBottom>
        General Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='firstName'
            name='firstName'
            label='First name'
            fullWidth
            autoComplete='given-name'
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='lastName'
            name='lastName'
            label='Last name'
            fullWidth
            autoComplete='family-name'
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id='email'
            name='email'
            label='Email'
            fullWidth
            autoComplete='email'
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                color='secondary'
                name='checkbox'
                checked={approvedUsingPrivateData}
                onChange={() => setApprovedUsingPrivateData(prev => !prev)}
              />
            }
            label='I confirm using my private data'
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default Form;

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  setUserData: PropTypes.func.isRequired,
  setApprovedUsingPrivateData: PropTypes.func.isRequired,
  approvedUsingPrivateData: PropTypes.bool.isRequired,
};
