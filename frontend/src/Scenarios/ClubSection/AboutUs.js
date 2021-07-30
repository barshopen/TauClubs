import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FacebookIcon from '@material-ui/icons/Facebook';
import { sendMailToClub } from '../../Shared/api';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100ch',
      justifyContent: 'center',
    },
  },
}));

const AboutUs = ({ name, description, contactMail }) => {
  const classes = useStyles();
  const [formValues, setFormValues] = useState({
    contactMail,
    clubName: name,
  });

  const handleChange = e =>
    setFormValues(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  const submitHandler = e => {
    e.preventDefault();
    e.target.reset();
    sendMailToClub({ data: formValues });
  };

  return (
    <div>
      <Container>
        <Box display='flex' justifyContent='center' m={2}>
          <Typography variant='h5' disply='inline' align='center'>
            {description}
          </Typography>
        </Box>
        <Box display='flex' justifyContent='center' m={2}>
          <Button
            variant='h5'
            disply='inline'
            align='center'
            target='_blank'
            href='https://chat.whatsapp.com/Ksx0PrM3VzA8Nm3KjDshmJ'
            startIcon={<WhatsAppIcon />}>
            WhatsApp group
          </Button>
          <Button
            variant='h5'
            disply='inline'
            align='center'
            target='_blank'
            href='https://chat.whatsapp.com/Ksx0PrM3VzA8Nm3KjDshmJ'
            startIcon={<FacebookIcon />}>
            Facebook group
          </Button>
        </Box>

        <Box display='flex' justifyContent='center' m={2}>
          <Typography variant='h5' disply='inline' align='center'>
            Contact us at {contactMail}:
          </Typography>
        </Box>
      </Container>
      <Container>
        <Box display='flex' justifyContent='center'>
          <form
            className={classes.root}
            onSubmit={submitHandler}
            autoComplete='off'>
            <div>
              <TextField
                onChange={handleChange}
                name='title'
                required
                variant='outlined'
                label='Title'
              />
            </div>
            <div>
              <TextField
                onChange={handleChange}
                name='info'
                variant='outlined'
                label='Content'
                fullWidth
                multiline
                size='medium'
                rows={5}
                required
              />
            </div>
            <div>
              <TextField
                onChange={handleChange}
                name='name'
                variant='outlined'
                label='Full Name'
                fullWidth
                multiline
                size='medium'
                required
              />
            </div>
            <div>
              <TextField
                onChange={handleChange}
                name='mail'
                variant='outlined'
                label='Email'
                fullWidth
                multiline
                size='medium'
                required
              />
            </div>
            <Box display='flex' justifyContent='center' p={2}>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                size='large'>
                Send
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </div>
  );
};

AboutUs.propTypes = {
  description: PropTypes.string,
  name: PropTypes.string.isRequired,
  contactMail: PropTypes.string,
};
AboutUs.defaultProps = { description: '', contactMail: '' };

export default AboutUs;
