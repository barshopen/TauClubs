import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
      position: 'relative',
    },
    width: drawerWidth,
    flexShrink: 0,
    zIndex: theme.zIndex.drawer,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerPaperDashboard: {
    width: drawerWidth,
    top: '60px',
  },
}));

const Copyright = ({ className }) => (
  <Typography className={className} variant='body2' color='textSecondary'>
    {'Copyright © '}
    <Link color='inherit' href='/'>
      TauClubs
    </Link>
    {new Date().getFullYear()}
  </Typography>
);

Copyright.propTypes = {
  className: PropTypes.string.isRequired,
};

const SideBar = ({ open, onClose, content, dashboardContext }) => {
  const classes = useStyles();

  return (
    <>
      <Hidden smUp implementation='css'>
        <Drawer
          variant='temporary'
          open={open}
          classes={{
            paper: dashboardContext
              ? classes.drawerPaperDashboard
              : classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          className={classes.drawer}
          onClose={onClose}>
          {content}
        </Drawer>
      </Hidden>

      <Hidden xsDown implementation='css'>
        <Drawer
          className={classes.drawer}
          classes={{
            paper: dashboardContext
              ? classes.drawerPaperDashboard
              : classes.drawerPaper,
          }}
          variant='permanent'
          open>
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

SideBar.propTypes = {
  open: PropTypes.node,
  onClose: PropTypes.func,
  content: PropTypes.node.isRequired,
  dashboardContext: PropTypes.bool,
};

SideBar.defaultProps = {
  open: null,
  onClose: null,
  dashboardContext: false,
};

export default SideBar;
