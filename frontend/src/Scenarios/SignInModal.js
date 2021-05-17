/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useSetRecoilState } from 'recoil';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { currentUser } from '../Shared/atoms';
import GenericModal from '../Components/Generic/GenericModal';

const REACT_APP_GOOGLE_CLIENT_ID =
  '18740809626-1et94g7dbvpmr4ajbc289d6p4rq35i7k.apps.googleusercontent.com';

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

function ModalContent() {
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

  return (
    <div className={classes.root}>
      <Typography variant='h5'>Login to TauClubs</Typography>
      <GoogleLogin
        clientId={REACT_APP_GOOGLE_CLIENT_ID}
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

export default function SignInModal({ ClickableTrigger }) {
  return (
    <GenericModal
      ClickableTrigger={ClickableTrigger}
      Content={ModalContent}
      maxWidth='xs'
    />
  );
}

SignInModal.propTypes = {
  ClickableTrigger: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.shape({ render: PropTypes.func.isRequired }),
  ]).isRequired,
};
