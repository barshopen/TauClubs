import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { Label } from './Label';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
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
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {title},
            <Typography variant='body2' color='textSecondary' component='span'>
              {`${count} Members `}
            </Typography>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {tags &&
          tags.map(tag => (
            <Button size='medim' color='primary'>
              <Label key={tag} color={color}>
                {tag}
              </Label>
            </Button>
          ))}
      </CardActions>
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

// ClubCard.propTypes = {
//   title: PropTypes.string.isRequired,
//   children: PropTypes.arrayOf(PropTypes.element),
// };

ClubCard.defaultProps = {
  //   children: [],
  title: '',
  count: 0,
  img: '',
  color: '',
};
