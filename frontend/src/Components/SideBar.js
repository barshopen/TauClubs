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
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import ExploreIcon from '@material-ui/icons/Explore';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ListSubheader from '@material-ui/core/ListSubheader';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { getClubs } from '../Shared/api';
import { showSideBarMobileState } from '../Shared/atoms';
import NewClubModal from '../Scenarios/NewClubModal';
import ContactUsModal from '../Scenarios/ContactUsModal';
import GenericModal from './Generic/GenericModal';

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
      position: 'relative',
    },
    width: drawerWidth,
    flexShrink: 0,
    zIndex: theme.zIndex.drawer,
  },
  drawerPaper: {
    width: drawerWidth,
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

const Copyright = () => (
  <Typography
    style={{ marginTop: '10px', wordBreak: 'break-word' }}
    variant='body2'
    color='textSecondary'>
    {'Copyright © '}
    <Link color='inherit' href='/'>
      TauClubs
    </Link>
    {new Date().getFullYear()}
  </Typography>
);

export default function SideBar() {
  const [clubsData, setClubsData] = useState([]);

  useEffect(() => {
    getClubs().then(mydata => setClubsData(mydata));
  }, []);
  const classes = useStyles();
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
      <Box display='flex' flexDirection='column'>
        <Box
          backgroundColor='background.default'
          m={2}
          p={2}
          position='absolute'
          bottom='0'>
          <Typography align='center' variant='body2'>
            For more information
          </Typography>
          <Box display='flex' justifyContent='center' pt={2}>
            <ContactUsModal />
          </Box>
          <Copyright />
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
