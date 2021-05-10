/* eslint-disable indent */
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import PropTypes from 'prop-types';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';
import { Form, Review, Description } from './index';
import { newUserData } from '../../../atoms';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: ' 70%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    borderRadius: '10px',
    width: '100%',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  stepIcon: {
    color: '#808080',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    backgroundColor: '#808080',
    color: 'white',
  },
}));

const steps = ['Welcome', 'General', 'Description'];

const JoinUs = ({ clubName }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const setUserData = useSetRecoilState(newUserData);

  const getStepContent = step => {
    switch (step) {
      case 0:
        return <Review />;
      case 1:
        return <Form setUserData={setUserData} handleSubmit={handleSubmit} />;
      case 2:
        return <Description />;
      default:
        throw new Error('Unknown step');
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    setTimeout(() => {
      setActiveStep(prev => prev + 1);
    }, 1000);
  };

  const handleNext = () => {
    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  return (
    <>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component='h1' variant='h4' align='center'>
            Join To {clubName}
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel
                  StepIconProps={{
                    classes: { root: classes.stepIcon },
                  }}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          <>
            {activeStep === steps.length ? (
              <>
                <Typography variant='h5' gutterBottom>
                  Thank you for applying to our club.
                </Typography>
                <Typography variant='subtitle1'>
                  Your form will wait to aprrovments
                </Typography>
              </>
            ) : (
              <>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={
                      activeStep === steps.length - 1
                        ? handleSubmit
                        : handleNext
                    }
                    className={classes.button}>
                    {activeStep === steps.length - 1 ? 'Join' : 'Next'}
                  </Button>
                </div>
              </>
            )}
          </>
        </Paper>
      </main>
    </>
  );
};

JoinUs.propTypes = {
  clubName: PropTypes.string,
};

JoinUs.defaultProps = {
  clubName: '',
};

export default JoinUs;
