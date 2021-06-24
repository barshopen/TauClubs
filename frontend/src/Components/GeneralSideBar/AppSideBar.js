import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { GiQueenCrown } from 'react-icons/gi';
import Toolbar from '@material-ui/core/Toolbar';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import ExploreIcon from '@material-ui/icons/Explore';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ListSubheader from '@material-ui/core/ListSubheader';
import { useRecoilState, useRecoilValue } from 'recoil';
import AddIcon from '@material-ui/icons/Add';
import useClubs from '../../hooks/useClubs';
import { showSideBarMobileState, currentUser } from '../../Shared/atoms';
import NewClubModal from '../../Scenarios/NewClubModal';
import ContactUsModal from '../../Scenarios/ContactUsModal';
import SideBar from './SideBar';
import { createClub } from '../../Shared/api';

const drawerWidth = 240;

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
  footer: {
    position: 'relative',
    height: '30%',
    [theme.breakpoints.up('md')]: {
      height: '40%',
    },
    [theme.breakpoints.up('lg')]: {
      height: '60%',
    },
  },
  copyRight: {
    marginTop: '10px',
    wordBreak: 'break-word',
    fontSize: '12px',
    [theme.breakpoints.up('lg')]: { fontSize: '14px' },
  },
}));

const SideBarListItem = ({
  text,
  id,
  children,
  to,
  admin,
  selectedIndex,
  handleListItemClick,
}) => (
  <NavLink to={to}>
    <ListItem
      key={text}
      button
      selected={selectedIndex === id}
      onClick={
        handleListItemClick && (event => handleListItemClick(event, id))
      }>
      <ListItemIcon>{children}</ListItemIcon>
      <ListItemText primary={text} />
      {admin && <GiQueenCrown />}
    </ListItem>
  </NavLink>
);

SideBarListItem.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  to: PropTypes.string,
  admin: PropTypes.bool,
  id: PropTypes.string,
  selectedIndex: PropTypes.number,
  handleListItemClick: PropTypes.func,
};

SideBarListItem.defaultProps = {
  to: '/#',

  admin: false,
  id: '',
  selectedIndex: 0,
  handleListItemClick: undefined,
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
function ClickableTrigger({ onClick }) {
  const text = 'Add New Club';
  return (
    <ListItem button key={text} onClick={onClick}>
      <ListItemIcon>
        <AddIcon />
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );
}

ClickableTrigger.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default function AppSideBar() {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const { myClubs } = useClubs();
  const user = useRecoilValue(currentUser);
  const SideBardListItems = [
    {
      text: 'Feed',
      route: '/',
      icon: LibraryBooksIcon,
      id: 0,
    },
    {
      text: 'Explore',
      route: !user ? '/' : '/explore',
      icon: ExploreIcon,
      id: 1,
    },
  ];

  const [showSideBarMobile, setShowSideBarMobile] = useRecoilState(
    showSideBarMobileState
  );
  const showSideBarMobileToggleHandler = () => {
    setShowSideBarMobile(!showSideBarMobile);
  };

  const pos = user ? 'absolute' : 'fixed';
  const content = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {SideBardListItems.map(listItem => {
          if (
            (listItem.text === 'Feed' && user) ||
            listItem.text === 'Explore'
          ) {
            return (
              <SideBarListItem
                text={listItem.text}
                id={listItem.id}
                selectedIndex={selectedIndex}
                handleListItemClick={handleListItemClick}
                key={listItem.text}
                to={listItem.route}>
                <listItem.icon />
              </SideBarListItem>
            );
          }
          return null;
        })}
        {user && (
          <NewClubModal
            ClickableTrigger={ClickableTrigger}
            handler={createClub}
            clubId={{
              name: 'Club Name',
              description: 'Club Description',
              contact: 'Club Contact Email',
              title: 'Create New Club',
            }}
          />
        )}
      </List>
      <Divider />
      {user && (
        <List subheader={<ListSubheader>My Clubs</ListSubheader>}>
          {myClubs?.map(d => (
            <SideBarListItem
              key={d.id}
              id={d.id}
              selectedIndex={selectedIndex}
              handleListItemClick={handleListItemClick}
              text={d.name}
              to={`/club/board/${d.id}`}
              admin={d.admin}>
              <Avatar alt={d.name} src={`${window.origin}/db/images/${d.id}`} />
            </SideBarListItem>
          ))}
        </List>
      )}
      <Box className={classes.footer} position={pos} bottom='0'>
        <Box m={2} p={2}>
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
    <SideBar
      open={showSideBarMobile}
      onClose={showSideBarMobileToggleHandler}
      content={content}
    />
  );
}
