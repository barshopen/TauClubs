import React from 'react';
import { useHistory } from 'react-router-dom';
import GoogleButton from 'react-google-button';

function Signin() {
  // const history = useHistory();

  const routeChange = () => {
    // const path = `/auth/login`;
    // history.replace(path); for production
    window.location.href = 'http://127.0.0.1:443/auth/login';
  };
  return <GoogleButton onClick={routeChange} />;
}
export default Signin;
