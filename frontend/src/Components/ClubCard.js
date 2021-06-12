import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import ChipsArray from './Generic/ChipsArray';

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.down('xl')]: {
      marginLeft: '1%',
      marginRight: '5%',
      marginBottom: '7%',
    },
    [theme.breakpoints.down('lg')]: {
      marginBottom: '0%',
    },
    [theme.breakpoints.down('md')]: {
      marginLeft: '2%',
      maxWidth: '100%',
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '2%',
      maxWidth: '100%',
      marginBottom: '0%',
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: '0%',
      maxWidth: '105%',
      marginBottom: '-20%',
    },
  },
  media: {
    height: '18rem',
  },
}));

const ClubCard = props => {
  const { title, tags, count, img, color } = props;

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          component='img'
          alt='Contemplative Reptile'
          image={img}
          title='Contemplative Reptile'
        />
        <CardContent style={{ padding: '10rm' }}>
          <Typography gutterBottom variant='h5' component='h2' padding='10rm'>
            {title}
            <Typography> </Typography>
            <Typography
              variant='body2'
              color='textSecondary'
              component='span'
              style={{ marginLeft: '10rm' }}>
              {`  ${count} Members `}
            </Typography>
          </Typography>
        </CardContent>
      </CardActionArea>
      {tags && <ChipsArray tags={tags} color={color} />}
    </Card>
  );
};

export default ClubCard;

ClubCard.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string,
  count: PropTypes.number,
  img: PropTypes.string,
  color: PropTypes.string,
};

ClubCard.defaultProps = {
  title: '',
  count: 0,
  img: '',
  color: '',
};
