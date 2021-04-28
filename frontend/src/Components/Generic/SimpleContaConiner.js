import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';

const SimpleContaConiner = ({ style = {}, children }) => (
  <>
    <CssBaseline />
    <Container maxWidth='m'>
      <Typography component='div' style={style}>
        {children}
      </Typography>
    </Container>
  </>
);

export default SimpleContaConiner;

SimpleContaConiner.propTypes = {
  style: PropTypes.node,
  children: PropTypes.node,
};

SimpleContaConiner.defaultProps = {
  style: {},
  children: {},
};
