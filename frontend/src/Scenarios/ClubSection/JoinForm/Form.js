import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';

const Form = ({
  handleSubmit,
  setApprovedUsingPrivateData,
  approvedUsingPrivateData,
}) => (
  <form onSubmit={handleSubmit}>
    <Typography variant='h6' gutterBottom>
      General Information
    </Typography>

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
  </form>
);

export default Form;

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  setApprovedUsingPrivateData: PropTypes.func.isRequired,
  approvedUsingPrivateData: PropTypes.bool.isRequired,
};
