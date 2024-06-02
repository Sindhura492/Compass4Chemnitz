import { CssBaseline, Grid, ThemeProvider } from "@mui/material";
import React from "react";
import { theme } from "../utils/themeProvider";
import Header from "./Header/Header";
import Maps from "./Map/Maps";



const Home = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            <Maps />
            {/* <Grid container spacing={3} style={{ width: '100%' }}>
                <Grid item xs={12} md={4}>
                    hhhhh
                </Grid>
                <Grid item xs={12} md={8}>
                    kokko
                </Grid>
            </Grid> */}

        </ThemeProvider>
    )
}

export default Home