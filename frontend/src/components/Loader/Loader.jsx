import { Backdrop, Box, CircularProgress, LinearProgress } from '@mui/material'
import React from 'react'

const Loader = () => {
  return (
    // <Backdrop sx={{ color: 'black', opacity: 0.75 }} open>
    //       <CircularProgress color="secondary" />
    //     </Backdrop>
    <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'fixed',
      top: 'auto',
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      zIndex: 1000,
    }}
  >
    <CircularProgress />
  </Box>
  )
}

export default Loader