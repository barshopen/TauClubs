import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
// import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import MessageIcon from '@material-ui/icons/Message';
import EventIcon from '@material-ui/icons/Event';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import StarIcon from '@material-ui/icons/Star';
import Tooltip from '@material-ui/core/Tooltip';
import { attend, interested, uninterested, unattend } from '../../Shared/api';
import useFeed from '../../hooks/useFeed';

const useStyles = makeStyles(theme => ({
  root: { marginBottom: '2%', padding: '1%' },
}));

export const eventsIcon = (clubId, id, isAttend, isInterested) => {
  const { refetchFeed } = useFeed();
  const handleInterested = () =>
    // eslint-disable-next-line no-nested-ternary
    isInterested
      ? uninterested(clubId, id).then(() => refetchFeed())
      : !isAttend
      ? interested(clubId, id).then(() => refetchFeed())
      : null;

  const handleAttend = () =>
    isAttend
      ? unattend(clubId, id).then(() => refetchFeed())
      : (attend(clubId, id).then(() => refetchFeed()),
        isInterested
          ? uninterested(clubId, id).then(() => refetchFeed())
          : null);
  return (
    <CardActions disableSpacing>
      <Tooltip title='Attend'>
        <IconButton aria-label='attend' onClick={handleAttend}>
          {isAttend ? (
            <EventAvailableIcon fontSize='large' style={{ color: 'green' }} />
          ) : (
            <EventAvailableIcon fontSize='large' />
          )}
        </IconButton>
      </Tooltip>
      {!isAttend && (
        <Tooltip title='Interested'>
          <IconButton aria-label='interested' onClick={handleInterested}>
            {isInterested ? (
              <StarIcon fontSize='large' style={{ color: 'gold' }} />
            ) : (
              <StarIcon fontSize='large' />
            )}
          </IconButton>
        </Tooltip>
      )}
    </CardActions>
  );
};

function GenericFeedMessage({ feedItem }) {
  const {
    title,
    clubName,
    description,
    startTime,
    location,
    lastUpdateTime,
    isAttend,
    isInterested,
    profileImage,
    content,
  } = feedItem;

  const classes = useStyles();
  const displayLastUpdate = new Date(lastUpdateTime).toLocaleString('en-GB');
  const displayStartTime = new Date(startTime).toLocaleString('en-GB');

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <Icon aria-label='type' color='inherit' fontSize='large'>
            {location && (
              <>
                <EventIcon fontSize='large' />
              </>
            )}
            {!location && (
              <>
                <MessageIcon fontSize='large' />
              </>
            )}
          </Icon>
        }
        titleTypographyProps={{ variant: 'h5' }}
        title={title}
        subheader={displayLastUpdate}
      />
      <CardContent>
        <Typography paragraph variant='h6' color='initial' component='p'>
          {content || description}
        </Typography>
        {location && (
          <>
            <Typography>Starts at: {displayStartTime}</Typography>
            <Typography>Location: {location}</Typography>
          </>
        )}
      </CardContent>
      <CardActions disableSpacing>
        {location &&
          eventsIcon(
            feedItem.clubId,
            feedItem.id,
            feedItem.isAttend,
            feedItem.isInterested
          )}
      </CardActions>
    </Card>
  );
}

GenericFeedMessage.propTypes = {
  feedItem: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      clubId: PropTypes.string,
      title: PropTypes.string,
      clubName: PropTypes.string,
      profileImage: PropTypes.string,
      description: PropTypes.string,
      content: PropTypes.string,
      lastUpdateTime: PropTypes.string,
      isAttend: PropTypes.string,
      isInterested: PropTypes.string,
      // duration: PropTypes.string,
    })
  ),
};

GenericFeedMessage.defaultProps = {
  feedItem: [],
};

export default GenericFeedMessage;
