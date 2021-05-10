import React, { useMemo, useState } from 'react';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PropTypes from 'prop-types';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import Hidden from '@material-ui/core/Hidden';
import { getClubs } from '../Shared/api';
import { showSideBarMobileState } from '../Shared/atoms';

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
  const userMessages = useMemo(() => 4, []);
  const userNotifications = useMemo(() => 7, []);
  const { data: queryData } = useQuery('allClubs', fetchClubs);
  const data = useMemo(() => queryData || [], [queryData]);

  // primitive consts
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isUser = true; // for now - later, if signed in will be true.
  const menuId = 'primary-search-account-menu';
  const mobileMenuId = 'primary-search-account-menu-mobile';

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

  // nodes
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
