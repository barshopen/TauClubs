import React from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
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
        About Tau Clubs
      </Typography>
      <Typography variant='subtitle1' gutterBottom align='center'>
        This site was created for you! here you can...
      </Typography>
      <Typography variant='h4' disply='inline' align='center'>
        Explore
      </Typography>
      <Typography
        variant='subtitle1'
        disply='inline'
        gutterBottom
        align='center'>
        Find clubs and groups that you like to join
      </Typography>
      <Typography variant='h4' disply='inline' align='center'>
        Participate
      </Typography>
      <Typography
        variant='subtitle1'
        disply='inline'
        gutterBottom
        align='center'>
        Get updates on meetups and other activities
      </Typography>
      <Typography variant='h4' disply='inline' align='center'>
        Create
      </Typography>
      <Typography
        variant='subtitle1'
        disply='inline'
        gutterBottom
        align='center'>
        Create your own club! find other students who share the same interests
      </Typography>
      <Box marginTop='0px'>
        <Typography variant='h4' align='center' gutterBottom>
          Created By
        </Typography>
        <Typography
          variant='subtitle1'
          disply='inline'
          gutterBottom
          align='center'>
          Avital Haiman || Bar Shopen || Daniel Peretz || Sharon Zolty
        </Typography>
      </Box>

      <Box p={1}>
        <Typography variant='h5' disply='inline' align='center' gutterBottom>
          Get In Touch!
        </Typography>
        <Box display='flex' justifyContent='center'>
          <Button
            variant='outlined'
            color='primary'
            font='Roboto Condensed'
            startIcon={<SendIcon />}
            href='mailto:tauclubs2021@gmail.com?body=hey!'>
            Send us a mail to tauclubs2021@gmail.com
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
