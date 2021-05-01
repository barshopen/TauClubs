import React from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import GoogleButton from 'react-google-button';
import Button from '@material-ui/core/Button';

function Signin() {
  const handle = () => <Redirect to='http://127.0.0.1:443/auth/login' />;
  const history = useHistory();

  const routeChange = () => {
    const path = `auth/login`;
    history.replace(path);
  };
  return <GoogleButton onClick={routeChange} />; // currently doesnt redirect, type http://127.0.0.1:443/auth/login to login
}
export default Signin;
