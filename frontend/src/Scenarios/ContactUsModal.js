import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import SendIcon from '@material-ui/icons/Send';

import GenericModal from '../Components/Generic/GenericModal';

const useStyles = makeStyles({
  root: {
    width: '100%',
    fontFamily: 'Roboto Condensed',
    align: 'center',
  },
  Typography: {
    align: 'center',
  },
});

function ClickableTrigger({ onClick }) {
  return (
    <Button color='primary' variant='contained' onClick={onClick}>
      Contact Us
    </Button>
  );
}

ClickableTrigger.propTypes = {
  onClick: PropTypes.func.isRequired,
};

function NewEventContent() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant='h2' align='center' gutterBottom>
        About TauClubs
      </Typography>
      <Typography variant='h4' align='center'>
        Explore
      </Typography>
      <Typography variant='subtitle1' gutterBottom align='center'>
        Find clubs and groups that you like to join
      </Typography>
      <Typography variant='h4' align='center'>
        Participate
      </Typography>
      <Typography variant='subtitle1' gutterBottom align='center'>
        Get updates on meetups and other activities
      </Typography>
      <Typography variant='h4' align='center'>
        Create
      </Typography>
      <Typography variant='subtitle1' gutterBottom align='center'>
        Create your own club!
      </Typography>

      <Box marginTop='20px'>
        <Typography
          disply='inline'
          style={{ fontSize: '0.8rem' }}
          gutterBottom
          align='center'>
          Created by: Avital Haiman, Bar Shopen, Daniel Peretz, Sharon Zolty
        </Typography>
      </Box>

      <Box p={1}>
        <Box display='flex' justifyContent='center'>
          <Button
            variant='outlined'
            color='primary'
            font='Roboto Condensed'
            startIcon={<SendIcon />}
            href='https://mail.google.com/mail/?view=cm&fs=1&to=tauclubs2021@gmail.com'
            target='_blank'>
            Mail us
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default function ContactUsModal() {
  return (
    <GenericModal
      ClickableTrigger={ClickableTrigger}
      Content={NewEventContent}
    />
  );
}
