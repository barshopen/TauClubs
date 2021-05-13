import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useSetRecoilState } from 'recoil';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { currentUser } from '../Shared/atoms';
import GenericModal from '../Components/Generic/GenericModal';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function ClickableTrigger({ onClick }) {
  return (
    <IconButton color='inherit' onClick={onClick}>
      <Tooltip title='Sign In' arrow>
        <ExitToAppIcon />
      </Tooltip>
    </IconButton>
  );
}

ClickableTrigger.propTypes = {
  onClick: PropTypes.func.isRequired,
};

function SignIn() {
  const classes = useStyles();
  const setUser = useSetRecoilState(currentUser);
  const [loginError, setLoginError] = useState(false);

  function loginSuccess(d) {
    // Log into backend with the ID token as credential:
    async function completeAuth() {
      const requestOptions = {
        method: 'POST',
        headers: {
          id_token: d.tokenObj.id_token,
        },
        body: JSON.stringify({ title: 'React POST Request Example' }),
      };

      fetch('/auth/login', requestOptions)
        .then(response => response.json())
        .then(setUser(true))
        .catch(error => {
          setLoginError(true);
        });
    }

    completeAuth();
  }

  function loginFailure(d) {
    setLoginError(true);
  }

  function ModalContent() {
    return (
      <div className={classes.root}>
        <Typography variant='h5'>Login to TauClubs</Typography>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText='Log in with Google'
          onSuccess={loginSuccess}
          onFailure={loginFailure}
          cookiePolicy='single_host_origin'
          redirectUri='postmessage'
          scope='openid'
        />
      </div>
    );
  }

  return (
    <GenericModal
      ClickableTrigger={ClickableTrigger}
      Content={ModalContent}
      maxWidth='xs'
    />
  );
}
export default SignIn;
