import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import GenericModal from '../Components/Generic/GenericModal';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
const Header = styled.h2`
  text-align: center;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 1rem;
  font-weight: bold;
`;

const Input = styled.input`
  height: ${props => props.height};
  font-family: 'Roboto';
  height: '30px';
`;
const TextArea = styled.textarea`
  height: '120px';
  font-family: 'Roboto';
`;

const Line = styled.div`
  display: flex;
  justify-content: space-around;
`;

function NewClubContent({ setOpen }) {
  const classes = useStyles();
  return (
    <Container className={classes.paper} maxWidth='md'>
      <Header>Create New Club</Header>

      <Input type='text' placeholder='Club Name' />
      <TextArea placeholder='Description of club' style={{ height: '140px' }} />
      <Input type='text' placeholder='Contact Email' />
      <Line>
        <Button
          variant='contained'
          color='primary'
          onClick={() => setOpen(false)}>
          Create
        </Button>
        <Button variant='contained' onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </Line>
    </Container>
  );
}

function ClickableTrigger({ onClick }) {
  return (
    <IconButton color='inherit' onClick={onClick}>
      <AddIcon />
    </IconButton>
  );
}

ClickableTrigger.propTypes = {
  onClick: PropTypes.func.isRequired,
};

function NewClub() {
  return (
    <GenericModal
      ClickableTrigger={ClickableTrigger}
      Content={NewClubContent}
    />
  );
}
NewClub.propTypes = {};

NewClub.defaultProps = {
  ClickableTrigger: styled.div``, // a default container
};
export default NewClub;
