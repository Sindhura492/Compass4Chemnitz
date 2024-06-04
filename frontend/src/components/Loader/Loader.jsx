import { Backdrop, CircularProgress, LinearProgress } from '@mui/material'
import React from 'react'

const Loader = () => {
  return (
    <Backdrop sx={{ color: 'black', opacity: 0.75 }} open>
          <CircularProgress color="secondary" />
        </Backdrop>
  )
}

export default Loader