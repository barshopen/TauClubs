import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Container from '@material-ui/core/Container';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import PropTypes from 'prop-types';
import { X as XIcon } from 'react-feather';
import { Box } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
    borderRadius: '5px',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default function GenericModal({
  ClickableTrigger,
  Content,
  maxWidth,
  onChange,
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
      <ClickableTrigger onClick={handleOpen} />
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
          <Container className={classes.container} maxWidth={maxWidth}>
            <Box
              style={{
                display: 'flex',
                flexDirection: 'row-reverse',
              }}>
              <XIcon
                onClick={handleClose}
                style={{ marginBottom: '10px', cursor: 'pointer' }}
              />
            </Box>

            <Content open={open} setOpen={setOpen} onChange={onChange} />
          </Container>
        </Fade>
      </Modal>
    </div>
  );
}

GenericModal.propTypes = {
  onChange: PropTypes.func,
  Content: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.shape({ render: PropTypes.func.isRequired }),
  ]).isRequired,
  ClickableTrigger: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.shape({ render: PropTypes.func.isRequired }),
  ]).isRequired,
  maxWidth: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs', false]),
};

GenericModal.defaultProps = {
  maxWidth: 'sm',
  onChange: undefined,
};
