import React from 'react';
import { Modal, Button, ButtonToolbar, Placeholder } from 'rsuite';

export default function ConfirmationBox({
  btnText,
  btnIcon,
  message,
  title,
  OnConfirm,
  btnClass,
   
}) {
  const [open, setOpen] = React.useState(false);
  
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        startIcon={btnIcon && btnIcon}
        className={btnClass}
        
      >
        {btnText}
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title><span className=' font-semibold'>{title}</span></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span className="text-md font-semibold">{message}</span>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="bg-blue-600"
            onClick={() => {
              OnConfirm();
              handleClose();
            }}
            appearance="primary"
          >
            Oui
          </Button>
          <Button onClick={handleClose} className="bg-red-500 text-white">
            Non
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
