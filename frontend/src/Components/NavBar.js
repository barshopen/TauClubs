import React, { useState } from 'react';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import { NavLink, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useRecoilState } from 'recoil';
import Hidden from '@material-ui/core/Hidden';
import { Button } from '@material-ui/core';
import { LogIn as LogInIcon, LogOut as LogOutIcon } from 'react-feather';
import Autocomplete from './AutoComplete';
import { logOut } from '../Shared/api';
import useClubs from '../hooks/useClubs';
import SignInModal from '../Scenarios/SignInModal';
import { showSideBarMobileState, currentUser } from '../Shared/atoms';

const useStyles = makeStyles(theme => ({
  appBar: {
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: 'black',
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    display: 'block',
    color: 'white',
    fontFamily: 'Domine, serif',
    fontSize: '1.1rem',
    [theme.breakpoints.down('xs')]: { maxWidth: '1ch' },
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
      width: '20%',
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
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
  },
  sectionMobile: {
    display: 'flex',
    justifyContent: 'flex-end',
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

MenuItemWithToolTip.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.number,
  icon: PropTypes.element.isRequired,
};

MenuItemWithToolTip.defaultProps = {
  content: null,
};

export default function NavBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [showSideBarMobile, setShowSideBarMobile] = useRecoilState(
    showSideBarMobileState
  );

  const { clubs: data } = useClubs();
  const [user, setUser] = useRecoilState(currentUser);

  const handleLogout = () => {
    logOut();
    setUser(null);
  };

  // primitive consts
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const menuId = 'primary-search-account-menu';
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const history = useHistory();

  // funcs
  const showSideBarMobileToggleHandler = () => {
    setShowSideBarMobile(!showSideBarMobile);
  };

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

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

  const SignInModalClickableTrigger = ({ onClick }) => (
    <>
      <div className={classes.sectionDesktop}>
        <Button
          color='primary'
          variant='contained'
          size='small'
          onClick={() => {
            setAnchorEl(false);
            onClick();
          }}>
          Sign In
        </Button>
      </div>
      <div className={classes.sectionMobile}>
        <LogInIcon
          onClick={() => {
            setAnchorEl(false);
            onClick();
          }}
        />
      </div>
    </>
  );
  SignInModalClickableTrigger.propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  const renderMenu = (
    <StyledMenu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}>
      <MenuItem onClick={handleMenuClose}>
        <NavLink exact to='/profile'>
          My account
        </NavLink>
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <NavLink to='/'>
          <p>Log out</p>
        </NavLink>
      </MenuItem>
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
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          title='Profile'
          icon={<AccountCircleIcon />}
        />
        <NavLink to='/profile'>
          <p>Profile</p>
        </NavLink>
      </MenuItem>

      <MenuItem>
        <MenuItemWithToolTip
          title='Log out'
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          onClick={handleLogout}
          icon={<LogOutIcon />}
        />
        <NavLink to='/'>
          <p>Log out</p>
        </NavLink>
      </MenuItem>
    </StyledMenu>
  );

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
          <Button disableRipple onClick={() => history.push('/')}>
            <Typography className={classes.title} variant='h6' noWrap>
              TauClubs
            </Typography>
          </Button>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <Autocomplete data={data} />
          </div>

          {user ? (
            <div style={{ flex: 'auto' }}>
              <div className={classes.sectionDesktop}>
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
            </div>
          ) : (
            <div style={{ flex: 'auto' }}>
              <SignInModal ClickableTrigger={SignInModalClickableTrigger} />
            </div>
          )}
        </Toolbar>
      </AppBar>
      {user && renderMobileMenu}
      {user && renderMenu}
    </div>
  );
}
