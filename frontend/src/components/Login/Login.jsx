import React, { useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import Header from '../Header/Header';

import { Avatar, Button, CssBaseline, Grid, Paper, TextField, ThemeProvider, Typography } from '@mui/material';

import useStyles from './styles';

import { theme } from '../../utils/themeProvider';


const Login = () => {

    const classes = useStyles();

    const [isSignup, setIsSignup] = useState(false);
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("inputss", inputs);
        //     axios.post(login, userData)
        //   .then((response) => {
        //     if (response.status === 200) {

        //     localStorage.setItem("accessToken", response.data["access"]);
        //     localStorage.setItem("refreshToken", response.data["refresh"]);

        //    window.location.href = "/home";

        //       console.log(response.status);
        //       console.log(response.data);
        //     }
        //   })
        //   .catch((error) => {
        //     if (error.response) {
        //       console.log(error.response);
        //       console.log("server responded");

        //     } else if (error.request) {
        //       console.log("network error");
        //     } else {
        //       console.log(error);
        //     }
        //   });
    }

    const resetState = () => {
        setIsSignup(!isSignup);
        setInputs({ name: '', email: '', password: '' });
    }

    return (
        <ThemeProvider theme={theme}>
        <CssBaseline />
            <Header />
            <form onSubmit={handleSubmit}>
                <Grid className={classes.background}>
                    <Paper className={classes.paperStyle} elevation={10}>
                        <Grid align='center'>
                            <Avatar className={classes.avatarStyle}><LockOutlinedIcon /></Avatar>
                            <h2>{isSignup ? "Signup" : "Login"}</h2>
                        </Grid>
                        {isSignup && (<TextField label='Name' placeholder='Enter Name' name="name" type='text' value={inputs.name} onChange={handleChange} fullWidth required />)}

                        <TextField className={classes.m8} label='Email' placeholder='Enter Email' type='email' name='email' value={inputs.email} onChange={handleChange} fullWidth required />
                        <TextField className={classes.m8} label='Password' placeholder='Enter password' name='password' value={inputs.password} onChange={handleChange} type='password' fullWidth required />

                        <Button type='submit' variant="contained" className={classes.m8} fullWidth>
                            <Typography variant='h6'>{isSignup ? "Signup" : "Login"}</Typography>
                        </Button>

                        <Typography variant='h6'>or</Typography>


                        <Button variant="contained" onClick={resetState} className={classes.m8} fullWidth>
                            <Typography variant='h6'>{isSignup ? "Login" : "Create Account"}</Typography>
                        </Button>
                    </Paper >
                </Grid>
            </form>
        </ThemeProvider>
    )
}

export default Login