import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';

const Form = ({ handleSubmit, setUserData }) => {
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
          <TextField
            id='address2'
            name='address2'
            label='Address line 2'
            fullWidth
            autoComplete='shipping address-line2'
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='city'
            name='city'
            label='City'
            fullWidth
            autoComplete='shipping address-level2'
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id='state'
            name='state'
            label='State/Province/Region'
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='zip'
            name='zip'
            label='Zip / Postal code'
            fullWidth
            autoComplete='shipping postal-code'
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='country'
            name='country'
            label='Country'
            fullWidth
            autoComplete='shipping country'
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                color='secondary'
                name='checkbox'
                value='yes'
                onChange={handleChange}
              />
            }
            label='Use this address for payment details'
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
};
