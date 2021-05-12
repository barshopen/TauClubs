import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Line = styled.div`
  display: flex;
  justify-content: space-around;
`;

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
  hover: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

export default function GenericModal({
  ClickableTrigger,
  hideButtons,
  children,
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button type='button' onClick={handleOpen}>
        <ClickableTrigger type='button' onClick={handleOpen} />
      </button>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={open}>
          <Container className={classes.paper} maxWidth='md'>
            {children}
            {!hideButtons && (
              <Line>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => console.log(false)}>
                  Create
                </Button>
                <Button variant='contained' onClick={() => setOpen(false)}>
                  Cancel
                </Button>
              </Line>
            )}
          </Container>
        </Fade>
      </Modal>
    </div>
  );
}

GenericModal.propTypes = {
  hideButtons: PropTypes.bool,
  children: PropTypes.node,
  ClickableTrigger: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.shape({ render: PropTypes.func.isRequired }),
  ]),
};

GenericModal.defaultProps = {
  hideButtons: false,
  children: React.createElement('div'),
  ClickableTrigger: styled.div``, // a default container
};
