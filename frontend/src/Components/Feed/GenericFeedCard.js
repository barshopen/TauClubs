import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
// import FavoriteIcon from '@material-ui/icons/Favorite';
import HomeIcon from '@material-ui/icons/Home';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { eventsIcon } from '../Generic/GenericFeedEvent';

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.down('xl')]: {
      marginLeft: '15%',
      maxWidth: '75%',
      marginTop: '2%',
      marginBottom: '2%',
    },
    [theme.breakpoints.down('lg')]: {
      marginLeft: '15%',
      maxWidth: '75%',
    },
    [theme.breakpoints.down('md')]: {
      marginLeft: '0%',
      maxWidth: '100%',
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0%',
      maxWidth: '100%',
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: '-11%',
      marginRight: '-11%',
      maxWidth: '130%',
      marginTop: '5%',
      marginBottom: '5%',
    },
  },
  media: {
    height: 0,
    paddingTop: '40%',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function cardHeader(profileImage, clubName, title, lastUpdateTime) {
  const displayLastUpdate = new Date(lastUpdateTime).toLocaleString('en-GB');
  return (
    <CardHeader
      avatar={<Avatar alt='club image' src={profileImage} />}
      titleTypographyProps={{ variant: 'h5' }}
      title={title}
      subheader={displayLastUpdate.concat(` ${clubName}`)}
    />
  );
}
function cardImage(profileImage, title) {
  const classes = useStyles();
  const isImg = profileImage !== '';
  return (
    isImg && (
      <CardMedia className={classes.media} image={profileImage} title={title} />
    )
  );
}

function homeIcon(clubId) {
  return (
    <Tooltip title='go to club'>
      <NavLink to={`/club/board/${clubId}`}>
        <IconButton aria-label='go to club home page'>
          <HomeIcon style={{ fontSize: 40 }} />
        </IconButton>
      </NavLink>
    </Tooltip>
  );
}

function FeedCardEvent({ feedItem }) {
  const {
    id,
    clubId,
    title,
    clubName,
    profileImage,
    description,
    startTime,
    location,
    lastUpdateTime,
    isAttend,
    isInterested,
  } = feedItem;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const displayStartTime = new Date(startTime).toLocaleString('en-GB');

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root} m={75}>
      {cardHeader(profileImage, clubName, title, lastUpdateTime)}
      {cardImage(profileImage, title)}
      <CardContent>
        <Typography paragraph variant='h6' color='initial' component='p'>
          {description}
        </Typography>
        {location && (
          <>
            <Typography>Starts at: {displayStartTime}</Typography>
            <Typography>Location: {location}</Typography>
          </>
        )}
      </CardContent>
      <CardActions disableSpacing>
        {homeIcon(clubId)}
        {eventsIcon(clubId, id, isAttend, isInterested)}
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'>
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <Typography paragraph>more details:</Typography>
          <Typography paragraph variant='h6' color='initial'>
            This events is the best one yet.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
function FeedCardMessage({ feedItem }) {
  const {
    clubId,
    title,
    clubName,
    profileImage,
    content,
    lastUpdateTime,
  } = feedItem;
  const classes = useStyles();

  return (
    <Card className={classes.root} m={75}>
      {cardHeader(profileImage, clubName, title, lastUpdateTime)}
      {cardImage(profileImage, title)}
      <CardContent>
        <Typography paragraph variant='h6' color='initial' component='p'>
          {content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {homeIcon(clubId)}
        {/*
        <Tooltip title='Like'>
          <IconButton aria-label='add to favorites'>
            <FavoriteIcon />
          </IconButton>
        </Tooltip>
        */}
      </CardActions>
    </Card>
  );
}

function FeedCard({ feedItem }) {
  if (feedItem?.location === undefined) {
    return FeedCardMessage({ feedItem });
  }
  return FeedCardEvent({ feedItem });
}

FeedCardEvent.propTypes = {
  feedItem: PropTypes.arrayOf(
    PropTypes.shape({
      clubId: PropTypes.string,
      title: PropTypes.string,
      clubName: PropTypes.string,
      date: PropTypes.string,
      profileImage: PropTypes.string,
      description: PropTypes.string,
      location: PropTypes.string,
      startTime: PropTypes.string,
      // duration: PropTypes.string,
    })
  ),
};

FeedCardEvent.defaultProps = {
  feedItem: [],
};

FeedCardMessage.propTypes = {
  feedItem: PropTypes.arrayOf(
    PropTypes.shape({
      clubId: PropTypes.string,
      title: PropTypes.string,
      clubName: PropTypes.string,
      profileImage: PropTypes.string,
      description: PropTypes.string,
      lastUpdateTime: PropTypes.string,
      // duration: PropTypes.string,
    })
  ),
};

FeedCardMessage.defaultProps = {
  feedItem: [],
};

export default FeedCard;
