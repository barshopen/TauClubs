import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import GoogleButton from 'react-google-button';
import { GoogleLogin } from 'react-google-login';
import { useSetRecoilState } from 'recoil';
import { currentUser } from '../atoms';

function Signin() {
  // const history = useHistory();
  const { setisUser } = useSetRecoilState(currentUser);
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

      fetch('/auth/confirm', requestOptions)
        .then(response => response.json())
        .then(setisUser(true))
        .catch(error => {
          setLoginError(true);
        });
    }

    completeAuth();
  }
  function loginFailure(d) {
    setLoginError(true);
  }
  const routeChange = () => {
    // const path = `/auth/login`;
    // history.replace(path); for production
    window.location.href = 'http://127.0.0.1:443/auth/login';
  };
  return (
    <GoogleLogin
      clientId='752350466610-gce0q11es3ap63hg0vn42p84p184pf0g.apps.googleusercontent.com'
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
