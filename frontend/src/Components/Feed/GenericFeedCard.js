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
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '80%',
    margin: 20,
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

function FeedCard({ date, title, profileImage, description }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  // eslint-disable-next-line no-unused-vars
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card className={classes.root} m={75}>
      <CardHeader
        avatar={
          <Avatar aria-label='CHESS' className={classes.avatar}>
            {profileImage}
          </Avatar>
        }
        action={
          <IconButton aria-label='settings'>
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={date}
      />
      <CardMedia className={classes.media} image={profileImage} title={title} />
      <CardContent>
        <Typography variant='h5' color='initial' component='p'>
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label='add to favorites'>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label='share'>
          <ShareIcon />
        </IconButton>
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
          <Typography paragraph variant='h5' color='initial'>
            This events is the best one yet.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

FeedCard.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  profileImage: PropTypes.string,
  description: PropTypes.string,
};

FeedCard.defaultProps = {
  date: '',
  title: '',
  profileImage: '',
  description: '',
};

export default FeedCard;
