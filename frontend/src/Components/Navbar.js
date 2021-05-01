/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  InputBase,
  Badge,
  Menu,
  MenuItem,
} from '@material-ui/core';

import {
  ExitToApp as ExitToAppIcon,
  Home as HomeIcon,
  Search as SearchIcon,
  AccountCircle,
  Mail as MailIcon,
  Notifications as NotificationsIcon,
  MoreVert as MoreIcon,
  Menu as MenuIcon,
} from '@material-ui/icons';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import { getClubs } from '../Shared/api';
import { showSideBarMobileState } from '../atoms';

const useStyles = makeStyles(theme => ({
  root: {
    flexgrow: 1,
    zIndex: theme.zIndex.drawer + 1,
  },
  appBar: {
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: 'black',
    font: 'Roboto',
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    fontFamilt: 'inherit',
    fontSize: '1rem',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    fontSize: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const MenuItemWithToolTip = ({ title, content, icon, ...rest }) => (
  <IconButton color='inherit' {...rest}>
    <Tooltip title={title} arrow>
      <Badge badgeContent={content} color='secondary'>
        {icon}
      </Badge>
    </Tooltip>
  </IconButton>
);

const fetchClubs = async () => {
  const res = await getClubs();
  return res;
};

export default function NavBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const { data } = useQuery('allClubs', fetchClubs);

  const [showSideBarMobile, setShowSideBarMobile] = useRecoilState(
    showSideBarMobileState
  );
  const showSideBarMobileToggleHandler = () => {
    setShowSideBarMobile(!showSideBarMobile);
  };

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  // get data about the current user
  const isUser = true; // for now - later, if signed in will be true.

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const userMessages = useMemo(() => 4, []);
  const userNotifications = useMemo(() => 7, []);

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <StyledMenu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </StyledMenu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <StyledMenu
      anchorEl={mobileMoreAnchorEl}
      id='customized-menu'
      keepMounted
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}>
      <MenuItem>
        <MenuItemWithToolTip
          title='Messages'
          content={userMessages}
          icon={<MailIcon />}
        />
        <p>Messages</p>
      </MenuItem>

      <MenuItem>
        <MenuItemWithToolTip
          title='Notifications'
          content={userNotifications}
          icon={<NotificationsIcon />}
        />
        <p>Notifications</p>
      </MenuItem>

      <MenuItem>
        <MenuItemWithToolTip
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          title='Profile'
          icon={<AccountCircle />}
        />
        <p>Profile</p>
      </MenuItem>
    </StyledMenu>
  );

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'>
            <MenuIcon />
          </IconButton>
          <MenuItemWithToolTip
            edge='start'
            className={classes.menuButton}
            aria-label='open drawer'
            title='Home'
            icon={
              <NavLink to='/'>
                <HomeIcon fontSize='small' />
              </NavLink>
            }
          />

          <Typography className={classes.title} variant='h6' noWrap>
            TauClubs
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>

            <Autocomplete
              id='combo-box-demo'
              options={data}
              getOptionLabel={option => option.name}
              renderInput={params => {
                const { InputLabelProps, InputProps, ...rest } = params;
                return (
                  <InputBase
                    {...params.InputProps}
                    {...rest}
                    placeholder='Search…'
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                  />
                );
              }}
            />
          </div>
          <div className={classes.grow} />

          {isUser ? (
            <>
              <div className={classes.sectionDesktop}>
                <MenuItemWithToolTip
                  title='Messages'
                  content={userMessages}
                  icon={<MailIcon />}
                />

                <MenuItemWithToolTip
                  title='Notifications'
                  content={userNotifications}
                  icon={<NotificationsIcon />}
                />

                <MenuItemWithToolTip
                  edge='end'
                  aria-label='account of current user'
                  aria-controls={menuId}
                  aria-haspopup='true'
                  onClick={handleProfileMenuOpen}
                  title='Profile'
                  icon={<AccountCircle />}
                />
              </div>

              <div className={classes.sectionMobile}>
                <MenuItemWithToolTip
                  aria-label='show more'
                  aria-controls={mobileMenuId}
                  aria-haspopup='true'
                  onClick={handleMobileMenuOpen}
                  title='Show More'
                  icon={<MoreIcon />}
                />
              </div>
            </>
          ) : (
            <MenuItemWithToolTip
              title='Sign In'
              icon={
                <NavLink to='/signin'>
                  <ExitToAppIcon />
                </NavLink>
              }
            />
          )}
        </Toolbar>
      </AppBar>
      {isUser && renderMobileMenu}
      {isUser && renderMenu}
    </div>
  );
}
