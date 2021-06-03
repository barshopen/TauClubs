import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import EventAvailableOutlinedIcon from '@material-ui/icons/EventAvailableOutlined';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import { NavLink } from 'react-router-dom';

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

function GenericFeedMessage({ title, date, children }) {
  const classes = useStyles();

  const handleInterested = () => {
    // send to backend
  };
  const handleAttend = () => {
    // send to backend
  };
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
      <CardActions>
        <Tooltip title='Attend'>
          <IconButton aria-label='attend' onClick={handleAttend}>
            <EventAvailableOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title='Interested'>
          <IconButton aria-label='interested' onClick={handleInterested}>
            <StarBorderOutlinedIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}

GenericFeedMessage.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  date: PropTypes.string,
};

GenericFeedMessage.defaultProps = {
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
export default GenericFeedMessage;
