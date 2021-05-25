import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    marginLeft: '5px',
  },
  chip: props => ({
    margin: theme.spacing(0.5),
    backgroundColor: props.color,
  }),
}));

const ChipsArray = ({ tags, color }) => {
  const classes = useStyles({ color });

  return (
    <Paper component='ul' elevation={0} className={classes.root}>
      {tags.map(tag => (
        <li>
          <Chip size='small' label={tag} className={classes.chip} />
        </li>
      ))}
    </Paper>
  );
};

ChipsArray.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  color: PropTypes.string,
};

ChipsArray.defaultProps = {
  tags: [],
  color: 'inherit',
};

export default ChipsArray;
