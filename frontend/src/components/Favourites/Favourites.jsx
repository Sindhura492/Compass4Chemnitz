import { CssBaseline, ThemeProvider } from '@mui/material'
import React, { useState } from 'react'
import Loader from '../Loader/Loader'
import { theme } from '../../utils/themeProvider';
import Header from '../Header/Header';

const Favourites = () => {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {isLoading && <Loader />}
            <Header />
        </ThemeProvider>

    )
}

export default Favourites