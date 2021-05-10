import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useSetRecoilState } from 'recoil';
import { currentUser } from '../Shared/atoms';

function Signin() {
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
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      buttonText='Log in with Google'
      onSuccess={loginSuccess}
      onFailure={loginFailure}
      cookiePolicy='single_host_origin'
      redirectUri='postmessage'
      scope='openid'
    />
  );
}
export default Signin;
