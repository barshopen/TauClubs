import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import StarIcon from '@material-ui/icons/Star';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import { attend, interested, uninterested, unattend } from '../../Shared/api';
import useFeed from '../../hooks/useFeed';
import UpdateEventModal from './UpdateEventModal';
import useClubFeed from '../../hooks/useClubFeed';

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-GB');
}

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 275,
    margin: theme.spacing(1, 1),
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

const IconBu = ({ onClick }) => (
  <IconButton color='inherit' aria-label='edit' onClick={onClick}>
    <Tooltip title='Edit'>
      <EditIcon />
    </Tooltip>
  </IconButton>
);

IconBu.propTypes = {
  onClick: PropTypes.func.isRequired,
};

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
    <CardActions style={{ display: 'flex' }}>
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

function GenericFeedEvent({
  id,
  clubId,
  title,
  isAttend,
  isInterested,
  date,
  children,
}) {
  const classes = useStyles();
  const { editEvent } = useClubFeed({ clubId });

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color='textSecondary'
          gutterBottom
        />
        <Typography variant='h5' component='h2'>
          {title}
        </Typography>

        <Typography variant='body2' component='p'>
          {children}
        </Typography>
        {date ? (
          <DateContainerOuter>
            <div>{formatDate(date)}</div>
          </DateContainerOuter>
        ) : null}
      </CardContent>

      {eventsIcon(clubId, id, isAttend, isInterested)}
      <UpdateEventModal ClickableTrigger={IconBu} editEvent={editEvent} />
    </Card>
  );
}

GenericFeedEvent.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  date: PropTypes.string,
  isAttend: PropTypes.bool.isRequired,
  isInterested: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  clubId: PropTypes.string.isRequired,
};

GenericFeedEvent.defaultProps = {
  children: [],
  date: '',
  title: '',
};

const DateContainerOuter = styled.div`
  display: inline-block;
  position: relative;

  font-size: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export default GenericFeedEvent;
