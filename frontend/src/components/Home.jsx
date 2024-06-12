import { CssBaseline, Grid, ThemeProvider } from "@mui/material";
import React, { useState } from "react";
import { theme } from "../utils/themeProvider";
import Header from "./Header/Header";
import Maps from "./Map/Maps";
import Loader from "./Loader/Loader";
import ErrorHandler from "./ErrorHandler/ErrorHandler";



const Home = () => {
    const [isLoading,setLoading]=useState(false);
    const [error, setError] = useState(null);

    const handleLoader = (value) => {
        setLoading(value);
      }
    
      const handleError = (error) => {
        setError(error);
      }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {isLoading && <Loader />}
            <Header isLoginPage={false}/>
            <Maps loading={handleLoader}
            error={handleError}/>

            {error && <ErrorHandler error={error} onClose={() => setError(null)} />}

        </ThemeProvider>
    )
}

export default Home