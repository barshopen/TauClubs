import React from 'react';
import { Link, Redirect, useHistory, Route, Switch } from 'react-router-dom';
import GoogleButton from 'react-google-button';
// import Button from '@material-ui/core/Button';
import GoogleLogin from 'react-google-login';

function Signin() {
  // const handle = () => <Redirect to='http://127.0.0.1:443/auth/login' />;
  const history = useHistory();

  const routeChange = () => {
    const path = `/auth/login`;
    history.replace(path);
  };
  return <GoogleButton onClick={routeChange} />; // currently doesnt redirect, type http://127.0.0.1:443/auth/login to login
  // return (
  // <GoogleLogin
  //  clientId='18740809626-1et94g7dbvpmr4ajbc289d6p4rq35i7k.apps.googleusercontent.com'
  // buttonText='Login'
  // cookiePolicy='single_host_origin'
  // />
  // );
}
export default Signin;
