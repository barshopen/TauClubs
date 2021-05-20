import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import ExploreIcon from '@material-ui/icons/Explore';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ListSubheader from '@material-ui/core/ListSubheader';
import { useRecoilState } from 'recoil';
import { getMyClubs } from '../Shared/api';
import { showSideBarMobileState } from '../Shared/atoms';
import NewClubModal from '../Scenarios/NewClubModal';
import ContactUsModal from '../Scenarios/ContactUsModal';

const drawerWidth = 240;

const SideBardListItems = [
  {
    text: 'Feed',
    route: '/',
    icon: LibraryBooksIcon,
  },
  {
    text: 'Explore',
    route: '/explore',
    icon: ExploreIcon,
  },
];

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
    width: drawerWidth,
    flexShrink: 0,
    zIndex: theme.zIndex.drawer,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  footer: {
    position: 'relative',
    height: '40%',
    [theme.breakpoints.up('md')]: {
      height: '60%',
    },
  },
  copyRight: {
    marginTop: '10px',
    wordBreak: 'break-word',
    fontSize: '12px',
    [theme.breakpoints.up('md')]: { fontSize: '14px' },
  },
}));

const SideBarListItem = ({ text, children, to }) => (
  <NavLink to={to}>
    <ListItem button key={text}>
      <ListItemIcon>{children}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  </NavLink>
);

SideBarListItem.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  to: PropTypes.string,
};

SideBarListItem.defaultProps = {
  to: '/#',
};

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

export default function SideBar() {
  const classes = useStyles();
  const [clubsData, setClubsData] = useState([]);

  useEffect(() => getMyClubs().then(mydata => setClubsData(mydata)), []);

  const [showSideBarMobile, setShowSideBarMobile] = useRecoilState(
    showSideBarMobileState
  );
  const showSideBarMobileToggleHandler = () => {
    setShowSideBarMobile(!showSideBarMobile);
  };

  const DrawerContent = (
    <div>
      <Toolbar />
      <Divider />

      <List>
        {SideBardListItems.map(listItem => (
          <SideBarListItem
            text={listItem.text}
            key={listItem.text}
            to={listItem.route}>
            <listItem.icon />
          </SideBarListItem>
        ))}
        <NewClubModal />
      </List>
      <Divider />
      <List
        subheader={
          <ListSubheader className={classes.subheaderCentered}>
            My Clubs
          </ListSubheader>
        }>
        {clubsData.map(d => (
          <SideBarListItem key={d.id} text={d.name} to={`/club/board/${d.id}`}>
            <Avatar alt={d.name} src={`/${d.profileImage}`} />
          </SideBarListItem>
        ))}
      </List>
      <Box className={classes.footer}>
        <Box m={2} p={2} position='absolute' bottom='0'>
          <Typography align='center' variant='body2'>
            For more information
          </Typography>
          <Box display='flex' justifyContent='center' pt={2}>
            <ContactUsModal />
          </Box>
          <Copyright className={classes.copyRight} />
        </Box>
      </Box>
    </div>
  );

  return (
    <>
      <Hidden smUp implementation='css'>
        <Drawer
          variant='temporary'
          open={showSideBarMobile}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          className={classes.drawer}
          onClose={showSideBarMobileToggleHandler}>
          {DrawerContent}
        </Drawer>
      </Hidden>

      <Hidden xsDown implementation='css'>
        <Drawer
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
          variant='permanent'
          open>
          {DrawerContent}
        </Drawer>
      </Hidden>
    </>
  );
}
