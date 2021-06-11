import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import ChipsArray from './Generic/ChipsArray';

const useStyles = makeStyles({
  root: {
    minHeight: '240px',
    width: '237px',
  },
});

const ClubCard = props => {
  const { title, tags, count, img, color } = props;

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component='img'
          alt='Contemplative Reptile'
          height='140'
          image={img}
          title='Contemplative Reptile'
        />
        <CardContent style={{ padding: '10x' }}>
          <Typography
            gutterBottom
            variant='h5'
            component='h2'
            marginRight='10px'>
            {title},
            <Typography
              variant='body2'
              color='textSecondary'
              component='span'
              style={{ marginLeft: '10px' }}>
              {`${count} Members `}
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
