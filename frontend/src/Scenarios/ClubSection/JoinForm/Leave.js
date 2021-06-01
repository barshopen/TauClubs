import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import PropTypes from 'prop-types';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { newUserData } from '../../../Shared/atoms';
import { Form, LeaveDescription } from './index';
import { leaveClub } from '../../../Shared/api';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    height: '550px',
  },
  layout: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: '50%',
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: '70%',
      height: '550px',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: '40px',
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

const steps = ['Information'];

const Leave = ({ clubName, clubId }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const setUserData = useSetRecoilState(newUserData);

  const getStepContent = step => {
    <LeaveDescription />;
  };

  const handleSubmit = event => {
    event.preventDefault();
    setIsLoading(true);

    leaveClub({ clubId }).then(() => {
      setActiveStep(prev => prev + 1);
      setIsLoading(false);
    });
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
            Leave {clubName}
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
                  Sad that you are leaving our club
                </Typography>
              </>
            ) : (
              <>
                {isLoading ? (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Loader
                      type='TailSpin'
                      color='#00BFFF'
                      height={50}
                      alignItems='center'
                      width={50}
                    />
                  </div>
                ) : (
                  getStepContent(activeStep)
                )}

                <div className={classes.buttons}>
                  <Button onClick={handleBack} className={classes.button}>
                    Back
                  </Button>
                  <Button
                    variant='contained'
                    color='primary'
                    disabled={activeStep === 0}
                    onClick={
                      activeStep === steps.length - 1
                        ? handleSubmit
                        : handleNext
                    }
                    className={classes.button}>
                    {activeStep === steps.length - 1 ? 'Quit' : 'Next'}
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

Leave.propTypes = {
  clubName: PropTypes.string,
  clubId: PropTypes.string.isRequired,
};

Leave.defaultProps = {
  clubName: '',
};

export default Leave;
