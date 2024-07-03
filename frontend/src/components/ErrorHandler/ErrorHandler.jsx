import { Alert, AlertTitle, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react';

const ErrorHandler = ({ error, onClose }) => {

    const [showAlert, setShowAlert] = useState(true);
    const [open, setOpen] = useState(true);

    useEffect(() => {
        setShowAlert(error !== null);
    }, [error]);

    const handleClose = () => {
        setOpen(false);
        setShowAlert(null);
        onClose();
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
              {/* {error?.title && <AlertTitle>{error.title}</AlertTitle>} */}
              <AlertTitle>{error?.message?.detail} </AlertTitle>
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