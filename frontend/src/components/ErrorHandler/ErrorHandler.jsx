import { Alert, AlertTitle, IconButton, Snackbar, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

const ErrorHandler = ({ error }) => {

    const [showAlert, setShowAlert] = useState(true);
    const [open, setOpen] = useState(true);

    useEffect(() => {
        setShowAlert(error !== null);
    }, [error]);

    //   const handleClose = () => {
    //     onClose(); // Call the parent's onClose function
    //   };

    const handleClose = () => {
        setOpen(false);
        setShowAlert(null);
    };

    return (
        <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        {/* <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
         ssdsdsd
        </Alert> */}
        {/* <Stack sx={{ width: '100%' }} spacing={2}> */}
          {showAlert && (
            <Alert severity={error.statusType || 'error'} onClose={handleClose}>
              {error?.title && <AlertTitle>{error.title}</AlertTitle>}
              {error.message.detail}
              {/* <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton> */}
            </Alert>
          )}
        {/* </Stack> */}
      </Snackbar>
        
    );
}

export default ErrorHandler