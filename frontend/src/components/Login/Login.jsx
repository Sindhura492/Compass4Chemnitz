import React, { useEffect, useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Header from '../Header/Header';
import { Avatar, Box, Button, CssBaseline, Grid, Paper, TextField, ThemeProvider, Typography } from '@mui/material';
import api, { routes } from '../../api';
import { ACCESS_TOKEN, REFRESH_TOKEN, USER_ID } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { theme } from '../../utils/themeProvider';
import { getResponseError, getResponseInfo } from '../../utils/errorUtils';
import ErrorHandler from '../ErrorHandler/ErrorHandler';
import Loader from '../Loader/Loader';

import useStyles from './styles';

const Login = () => {

    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate()

    const classes = useStyles();

    const [isSignup, setIsSignup] = useState(false);
    const [inputs, setInputs] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

    useEffect(() => {
        localStorage.clear()
    }, []);


    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
        setError(null);
        if(e.target.name === 'confirmPassword'){
            setPasswordError(null);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Password validation for signup
        if (isSignup && inputs.password !== inputs.confirmPassword) {
            setPasswordError("Passwords do not match");
            return;
        }

        setLoading(true)
        try {
            const route = isSignup ? routes.register : routes.login;
            const data = {
                "username": inputs.username,
                "first_name": inputs.firstname,
                "last_name": inputs.lastname,
                "email": inputs.email,
                "password": inputs.password
            }
            const res = await api.post(route, data)
            if (!isSignup) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                localStorage.setItem(USER_ID, res.data.user_id)
                navigate('/')
            }
            else {
                const errorData = getResponseInfo(error);
                setError(errorData);
                navigate('/login');
                setIsSignup(false);
            }
        }
        catch (error) {
            const errorData = getResponseError(error);
            setError(errorData);
        } finally {
            setLoading(false)
        }
    }

    const resetState = () => {
        setIsSignup(!isSignup);
        setInputs({ firstname: '', lastname: '', username: '', email: '', password: '' });
        setError(null);
        setPasswordError(null);
    }


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {isLoading && <Loader />}
            <Header isLoginPage={true} />

            <Box component="form" onSubmit={handleSubmit}>
                <Grid container className={classes.background} sx={{ minHeight: '100vh' }}>
                    <Grid container sx={{ maxWidth: '40vw' }}>
                        <Paper className={classes.paperStyle} elevation={10} sx={{ width: '100%' }}>
                            <Box className={classes.scrollbar} sx={{ overflowY: 'auto', maxHeight: 'calc(100vh - 160px)' }}>
                                <Grid align='center'>
                                    <Avatar className={classes.avatarStyle}><LockOutlinedIcon /></Avatar>
                                    <h2>{isSignup ? "Signup" : "Login"}</h2>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        {isSignup && (<TextField margin="dense" label='Firstname' placeholder='Enter First Name' name="firstname" type='text' value={inputs.firstname} onChange={handleChange} fullWidth required autoFocus />)}

                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        {isSignup && (<TextField margin="dense" label='Lastname' placeholder='Enter Last Name' name="lastname" type='text' value={inputs.lastname} onChange={handleChange} fullWidth required />)}

                                    </Grid>
                                </Grid>


                                <TextField margin="dense" label="Username" placeholder='Enter Username' type='text' name='username' value={inputs.username} onChange={handleChange} fullWidth required autoFocus />

                                {isSignup && (<TextField margin="dense" label='Email' placeholder='Enter Email' type='email' name='email' value={inputs.email} onChange={handleChange} fullWidth required />)}

                                <TextField margin="dense" label='Password' placeholder='Enter password' name='password' value={inputs.password} onChange={handleChange} type='password' fullWidth required />

                                {isSignup && (<TextField margin="dense" label='Confirm Password' placeholder='Confirm Passworrd' type='password' name='confirmPassword' value={inputs.confirmPassword} onChange={handleChange} fullWidth required error={!!passwordError} helperText={passwordError}/>)}


                                <Button type='submit' variant="contained" className={classes.m8} fullWidth>
                                    <Typography variant='h6'>{isSignup ? "Signup" : "Login"}</Typography>
                                </Button>

                                <Typography align='center' variant='h6'>or</Typography>


                                <Button variant="contained" onClick={resetState} className={classes.m8} fullWidth>
                                    <Typography variant='h6'>{isSignup ? "Login" : "Create Account"}</Typography>
                                </Button>
                            </Box>
                        </Paper >
                    </Grid>
                </Grid>
            </Box>
            {error && <ErrorHandler error={error} onClose={() => setError(null)} />}
        </ThemeProvider>
    )
}

export default Login