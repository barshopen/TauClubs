import React, { useMemo, useState } from 'react';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useQuery } from 'react-query';
import { useSetRecoilState, useRecoilState } from 'recoil';
import {
  Button,
  Hidden,
  Typography,
  AppBar,
  Toolbar,
  Tooltip,
  InputBase,
  IconButton,
  Badge,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { LogIn as LogInIcon, LogOut as LogOutIcon } from 'react-feather';

import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Search as SearchIcon,
  AccountCircle as AccountCircleIcon,
  Mail as MailIcon,
  Notifications as NotificationsIcon,
  MoreVert as MoreVertIcon,
} from '@material-ui/icons';
import { logOut, getClubs } from '../Shared/api';

import {
  showSideBarMobileState,
  currentUser,
  selectedOptionState,
} from '../Shared/atoms';
import SearchFor from '../assets/search-icon.png';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
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

function MenuItemWithToolTip({ title, content, icon, ...rest }) {
  return (
    <IconButton color='inherit' {...rest}>
      <Tooltip title={title} arrow>
        <Badge badgeContent={content} color='secondary'>
          {icon}
        </Badge>
      </Tooltip>
    </IconButton>
  );
}

MenuItemWithToolTip.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.number,
  icon: PropTypes.element.isRequired,
};

MenuItemWithToolTip.defaultProps = {
  content: null,
};

const fetchClubs = async () => {
  const res = await getClubs();
  return res;
};

export default function NavBar() {
  // hooks
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [showSideBarMobile, setShowSideBarMobile] = useRecoilState(
    showSideBarMobileState
  );
  const { data, isLoading } = useQuery('allClubs', fetchClubs);
  const [user, setUser] = useRecoilState(currentUser);
  const [search, setSearch] = useState('');
  const userMessages = useMemo(() => 4, []);
  const userNotifications = useMemo(() => 7, []);

  const handleLogout = () => {
    logOut();
    setUser(false);
  };

  // primitive consts
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const menuId = 'primary-search-account-menu';
  const mobileMenuId = 'primary-search-account-menu-mobile';

  // funcs
  const showSideBarMobileToggleHandler = () => {
    setShowSideBarMobile(!showSideBarMobile);
  };
  const setSelectedOptionState = useSetRecoilState(selectedOptionState);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const defaultFilterOptions = useMemo(() => {
    if (data) {
      return search
        ? data.slice(0, 20).concat([
            {
              name: `Search for ${search}`,
              icon: SearchFor,
            },
          ])
        : data;
    }
    return [];
  }, [data, search]);

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

  const renderMenu = (
    <StyledMenu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}>
      <MenuItem onClick={handleMenuClose}>
        <NavLink to='/profile'>My account</NavLink>
      </MenuItem>
      <MenuItem onClick={handleLogout}>Log out</MenuItem>
    </StyledMenu>
  );

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
          icon={<AccountCircleIcon />}
        />
        <p>Profile</p>
      </MenuItem>

      <MenuItem>
        <MenuItemWithToolTip
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          onClick={handleLogout}
          icon={<LogOutIcon />}
        />
        <p>Log out</p>
      </MenuItem>
    </StyledMenu>
  );

  const searchImageStyle = {
    marginRight: '10px',
    width: '12%',
    height: '12%',
  };

  return (
    <div className={classes.grow}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Hidden smUp implementation='css'>
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='menu'
              onClick={showSideBarMobileToggleHandler}>
              <MenuIcon />
            </IconButton>
          </Hidden>
          <MenuItemWithToolTip
            edge='start'
            className={classes.menuButton}
            aria-label='open drawer'
            title='Home'
            icon={
              <NavLink onClick={() => setSelectedOptionState('')} to='/'>
                <HomeIcon
                  onClick={() => setSelectedOptionState('')}
                  fontSize='small'
                />
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
              size='small'
              autoComplete
              autoHighlight
              autoSelect
              onChange={(event, newValue) => {
                setSelectedOptionState(newValue?.id || '');
              }}
              options={isLoading ? ['loading...'] : defaultFilterOptions}
              getOptionLabel={option => option.render ?? option.name}
              renderOption={option => (
                <>
                  {option.icon && (
                    <img src={option.icon} alt='' style={searchImageStyle} />
                  )}
                  {option.name}
                </>
              )}
              renderInput={params => {
                const { InputLabelProps, InputProps, ...rest } = params;
                setSearch(rest.inputProps.value);

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

          {user ? (
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
                  icon={<AccountCircleIcon />}
                />
              </div>

              <div className={classes.sectionMobile}>
                <MenuItemWithToolTip
                  aria-label='show more'
                  aria-controls={mobileMenuId}
                  aria-haspopup='true'
                  onClick={handleMobileMenuOpen}
                  title='Show More'
                  icon={<MoreVertIcon />}
                />
              </div>
            </>
          ) : (
            <NavLink to='/signin'>
              <div className={classes.sectionDesktop}>
                <Button
                  color='primary'
                  variant='contained'
                  size='small'
                  onClick={() => setAnchorEl(false)}>
                  Sign in
                </Button>
              </div>
              <div className={classes.sectionMobile}>
                <LogInIcon onClick={() => setAnchorEl(false)} />
              </div>
            </NavLink>
          )}
        </Toolbar>
      </AppBar>
      {user && renderMobileMenu}
      {user && renderMenu}
    </div>
  );
}
