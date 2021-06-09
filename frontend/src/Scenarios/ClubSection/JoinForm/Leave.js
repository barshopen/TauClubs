import React, { useState } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import PropTypes from 'prop-types';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import useClubs from '../../../hooks/useClubs';
import { LeaveDescription } from './index';
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
  const { refetchMyClubs } = useClubs();
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const history = useHistory();

  const getStepContent = () => <LeaveDescription />;

  const handleSubmit = event => {
    event.preventDefault();
    setIsLoading(true);

    leaveClub({ clubId })
      .then(async () => {
        setActiveStep(prev => prev + 1);
        await queryClient.invalidateQueries(['club', clubId]);
        history.goBack();
        // refetchMyClubs();
      })
      .then(() => setIsLoading(false));
  };

  return (
    <>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component='h1' variant='h4' align='center'>
            Leave {clubName}
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            <Step key='information'>
              <StepLabel
                StepIconProps={{
                  classes: { root: classes.stepIcon },
                }}>
                information
              </StepLabel>
            </Step>
          </Stepper>
          <>
            {activeStep === steps.length ? (
              <>
                <Typography variant='h5' gutterBottom>
                  Sad to see you leave
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
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={handleSubmit}
                    className={classes.button}>
                    Quit
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
