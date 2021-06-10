import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import { attend, interested, uninterested, unattend } from '../../Shared/api';

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

export const eventsIcon = (clubId, id, isAttend, isInterested) => {
  const handleInterested = () =>
    // eslint-disable-next-line no-nested-ternary
    isInterested
      ? uninterested(clubId, id)
      : !isAttend
      ? interested(clubId, id)
      : null;

  const handleAttend = () =>
    isAttend
      ? unattend(clubId, id)
      : (attend(clubId, id), isInterested ? uninterested(clubId, id) : null);
  return (
    <CardActions disableSpacing>
      <Tooltip title='Attend'>
        <IconButton aria-label='attend' onClick={handleAttend}>
          {isAttend ? (
            <EventAvailableIcon style={{ color: 'green' }} />
          ) : (
            <EventAvailableIcon />
          )}
        </IconButton>
      </Tooltip>
      <Tooltip title='Interested'>
        <IconButton aria-label='interested' onClick={handleInterested}>
          {isInterested ? (
            <StarBorderOutlinedIcon style={{ color: 'green' }} />
          ) : (
            <StarBorderOutlinedIcon />
          )}
        </IconButton>
      </Tooltip>
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
