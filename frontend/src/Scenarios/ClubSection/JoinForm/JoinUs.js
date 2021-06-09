import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { useQueryClient } from 'react-query';
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
import { Form, Description } from './index';
import { joinClub } from '../../../Shared/api';
import useClubs from '../../../hooks/useClubs';

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

const steps = ['General', 'Description'];

const JoinUs = ({ clubName, clubId }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  // const { refetchMyClubs } = useClubs();
  const [approvedUsingPrivateData, setApprovedUsingPrivateData] = useState(
    false
  );
  const queryClient = useQueryClient();
  const setUserData = useSetRecoilState(newUserData);
  const history = useHistory();

  const getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <Form
            setUserData={setUserData}
            handleSubmit={handleSubmit}
            setApprovedUsingPrivateData={setApprovedUsingPrivateData}
            approvedUsingPrivateData={approvedUsingPrivateData}
          />
        );
      case 1:
        return <Description />;
      default:
        throw new Error('Unknown step');
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    setIsLoading(true);

    joinClub({ clubId }).then(async () => {
      setActiveStep(prev => prev + 1);
      await queryClient.invalidateQueries(['club', clubId]);

      // await refetchMyClubs();
      history.goBack();
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
                  Thank you for applying to join our club!
                </Typography>
                <Typography variant='subtitle1'>
                  Your application sent to the club manager
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
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant='contained'
                    color='primary'
                    disabled={activeStep === 0 && !approvedUsingPrivateData}
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
  clubId: PropTypes.string.isRequired,
};

JoinUs.defaultProps = {
  clubName: '',
};

export default JoinUs;
