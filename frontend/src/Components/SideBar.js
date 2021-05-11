import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import ExploreIcon from '@material-ui/icons/Explore';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import AddIcon from '@material-ui/icons/Add';
import ListSubheader from '@material-ui/core/ListSubheader';
import Hidden from '@material-ui/core/Hidden';
import { useRecoilState } from 'recoil';
import { getClubs } from '../Shared/api';
import { showSideBarMobileState } from '../Shared/atoms';

const drawerWidth = 240;

const SideBardListItems = [
  {
    text: 'Feed',
    route: '/#',
    icon: LibraryBooksIcon,
  },
  {
    text: 'Explore',
    route: '/explore',
    icon: ExploreIcon,
  },
  {
    text: 'Add New Club',
    route: '/#',
    icon: AddIcon,
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
}));

function SideBarListItem({ text, children, to }) {
  return (
    <NavLink to={to}>
      <ListItem button key={text}>
        <ListItemIcon>{children}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    </NavLink>
  );
}

SideBarListItem.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  to: PropTypes.string,
};

SideBarListItem.defaultProps = {
  to: '/#',
};

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