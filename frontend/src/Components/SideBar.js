import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Toolbar from '@material-ui/core/Toolbar';
import PropTypes from 'prop-types';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { getClubs } from '../Shared/api';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: theme.zIndex.drawer,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
}));

function SideBarListItem({ text, avatarSrc, Icon }) {
  if (!Icon && !avatarSrc) {
    Icon = KeyboardArrowRightIcon;
  }
  return (
    <ListItem button key={text}>
      <ListItemIcon>
        <Avatar alt={text} src={avatarSrc} />
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );
}

SideBarListItem.propTypes = {
  text: PropTypes.string.isRequired,
  avatarSrc: PropTypes.string,
  Icon: PropTypes.node,
};

SideBarListItem.defaultProps = {
  avatarSrc: '',
  Icon: null,
};

export default function SideBar() {
  const [clubsData, setClubsData] = useState([]);
  useEffect(() => {
    getClubs().then(mydata => setClubsData(mydata));
  }, []);
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant='permanent'
      classes={{
        paper: classes.drawerPaper,
      }}>
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          {['Feed', 'Explore'].map(text => (
            <SideBarListItem Icon={InboxIcon} text={text} />
          ))}
        </List>
        <Divider />
        <List>
          {clubsData.map(d => (
            <SideBarListItem
              Icon={MailIcon}
              text={d.name}
              avatarSrc={d.profileImage}
            />
          ))}
        </List>
      </div>
    </Drawer>
  );
}
