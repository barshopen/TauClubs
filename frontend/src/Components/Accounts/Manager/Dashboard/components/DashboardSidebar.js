import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
} from '@material-ui/core';
import {
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  Users as UsersIcon,
} from 'react-feather';
import NavItem from './NavItem';

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith',
};

const items = [
  {
    href: '/profile/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard',
  },
  {
    href: '/profile/customers',
    icon: UsersIcon,
    title: 'Users',
  },
  {
    href: '/profile/products',
    icon: ShoppingBagIcon,
    title: 'Clubs',
  },
  {
    href: '/profile/account',
    icon: UserIcon,
    title: 'My Account',
  },
  {
    href: '/profile/settings',
    icon: SettingsIcon,
    title: 'Settings',
  },
];

const useStyles = makeStyles(() => ({
  paper: {
    position: 'absolute',
    top: '65px',
    width: '250px',
  },
}));

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();
  const classes = useStyles();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box display='flex' flexDirection='column' height='100%'>
      <Box alignItems='center' display='flex' flexDirection='column' p={2}>
        <Avatar
          component={RouterLink}
          src={user.avatar}
          style={{
            cursor: 'pointer',
            width: 64,
            height: 64,
          }}
          to='/profile/account'
        />
        <Typography color='textPrimary' variant='h5'>
          {user.name}
        </Typography>
        <Typography color='textSecondary' variant='body2'>
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map(item => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden mdDown>
        <Drawer
          classes={{
            paper: classes.paper,
          }}
          anchor='left'
          open
          variant='persistent'
          className={classes.drawer}>
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};
DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default DashboardSidebar;
