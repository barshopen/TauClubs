import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const AboutUs = ({ description, contactMail }) => (
  <Container>
    <Box display='flex' justifyContent='center' m={2}>
      <Typography variant='h5' disply='inline' align='center'>
        {description}
      </Typography>
    </Box>
    <Container>
      <Box display='flex' justifyContent='center' m={2}>
        <Button
          variant='outlined'
          color='primary'
          font='Roboto Condensed'
          startIcon={<SendIcon />}
          href={`mailto:${contactMail}?body=hey!`}>
          Send us a mail to {contactMail}
        </Button>
      </Box>
    </Container>
  </Container>
);

AboutUs.propTypes = {
  description: PropTypes.string,
  contactMail: PropTypes.string,
};
AboutUs.defaultProps = { description: '', contactMail: '' };

export default AboutUs;
