import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import IconButton from '@material-ui/core/IconButton';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import useClubFeed from '../../hooks/useClubFeed';
import UpdatMessageModal from '../../Scenarios/UpdateMessageModal';

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

function GenericFeedMessage({ clubId, id, title, date, children }) {
  const classes = useStyles();
  const { editMessage } = useClubFeed({ clubId });
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
      <UpdatMessageModal
        ClickableTrigger={IconBu}
        editMessage={editMessage}
        clubId={id}
      />
      {/*
      <CardActions>
        <IconButton aria-label='add to favorites'>
          <FavoriteIcon />
        </IconButton>
      </CardActions>
      */}
    </Card>
  );
}

GenericFeedMessage.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string.isRequired,
  clubId: PropTypes.string.isRequired,
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
