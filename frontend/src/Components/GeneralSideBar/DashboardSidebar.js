import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Avatar, Box, Divider, List, Typography } from '@material-ui/core';
import {
  BarChart as BarChartIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  Users as UsersIcon,
} from 'react-feather';
import { useRecoilValue } from 'recoil';
import NavItem from '../Accounts/Manager/Dashboard/components/NavItem';
import SideBar from './SideBar';
import { currentUser } from '../../Shared/atoms';

const items = [
  {
    href: '/profile',
    icon: BarChartIcon,
    title: 'Dashboard',
  },
  {
    href: '/profile/users',
    icon: UsersIcon,
    title: 'Users',
  },
  {
    href: '/profile/clubs',
    icon: ShoppingBagIcon,
    title: 'Clubs',
  },
  {
    href: '/profile/account',
    icon: UserIcon,
    title: 'My Account',
  },
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();
  const current = useRecoilValue(currentUser);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const user = {
    avatar: current?.picture || '',
    name: `${current?.firstName} ${current?.lastName}`,
  };

  const content = (
    <Box>
      <Box alignItems='center' display='flex' flexDirection='column' p={2}>
        <Avatar
          component={RouterLink}
          src={user.avatar}
          style={{
            cursor: 'pointer',
            width: 64,
            height: 64,
            marginBottom: '10px',
          }}
          to='/profile/account'
        />
        <Typography color='textPrimary' variant='h5'>
          {user.name}
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

  return <SideBar content={content} dashboardContext />;
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
