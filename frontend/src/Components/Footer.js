import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import styled from 'styled-components';
import GenericModal from './Generic/GenericModal';

const Copyright = () => (
  <Typography variant='body2' color='textSecondary'>
    {'Copyright © '}
    <Link color='inherit' href='/'>
      TauClubs
    </Link>
    {new Date().getFullYear()}
  </Typography>
);

const Header = styled.h2`
  text-align: center;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 1rem;
  font-weight: bold;
`;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '50vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  container: {
    margin: 'unset',
    display: 'flex',
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor: '#cccccc',
  },
  typography: {
    marginLeft: '30px',
    cursor: 'pointer',
  },
}));

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 50vh;
`;

const Footer = () => {
  const classes = useStyles();
  const [contactModal, setShowContactModal] = useState(false);

  return (
    <div className={classes.root}>
      <GenericModal
        showModal={contactModal}
        setShowModal={setShowContactModal}
        Container={ModalContainer}
        hideButtons>
        <Header>Contact Details</Header>
      </GenericModal>

      <footer className={classes.footer}>
        <Container className={classes.container} maxWidth='sm'>
          <Copyright />
          <Typography
            className={classes.typography}
            variant='body2'
            onClick={() => setShowContactModal(true)}>
            Contact Us
          </Typography>
        </Container>
      </footer>
    </div>
  );
};

export default Footer;
