import React, { useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import Header from '../Header/Header';

import { Avatar, Box, Button, CssBaseline, Grid, Paper, TextField, ThemeProvider, Typography } from '@mui/material';

import useStyles from './styles';

import api, { routes } from '../../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants';
import { useNavigate } from 'react-router-dom';


import { theme } from '../../utils/themeProvider';
import { getResponseError } from '../../utils/errorUtils';
import ErrorHandler from '../ErrorHandler/ErrorHandler';
import Loader from '../Loader/Loader';


const Login = () => {

    const [isLoading,setLoading]=useState(false);
    const navigate=useNavigate()

    const classes = useStyles();

    const [isSignup, setIsSignup] = useState(false);
    const [inputs, setInputs] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: ''
    });

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
        setError(null);
    }

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        try {
            const route = isSignup ? routes.register : routes.login;
            const data = {
                    "username": inputs.username,
                    "first_name": inputs.firstname,
                    "last_name": inputs.lastname,
                    "email": inputs.email,
                    "password": inputs.password
            }
            const res=await api.post(route, data)
            if(!isSignup){
                localStorage.setItem(ACCESS_TOKEN,res.data.access)
                localStorage.setItem(REFRESH_TOKEN,res.data.refresh)
                navigate('/')
            }
            else{
                navigate('/login');
                setIsSignup(false);
            }        
        }
        catch(error){
            // alert(error)
            console.log("helloooo");
            const errorData = getResponseError(error);
            setError(errorData);
        }finally{
            setLoading(false)
        }
    }

    const resetState = () => {
        setIsSignup(!isSignup);
        setInputs({ firstname: '', lastname: '', username: '', email: '', password: '' });
    }

    return (
        <ThemeProvider theme={theme}>
        <CssBaseline />
        {isLoading && <Loader />}
            <Header />
            
            <Box component="form" onSubmit={handleSubmit}>
                <Grid container className={classes.background} sx={{ minHeight: '100vh' }}>
                <Grid container sx={{ maxWidth: '40vw' }}>
                    <Paper className={classes.paperStyle} elevation={10} sx={{ width: '100%' }}>
                    <Box className={classes.scrollbar} sx={{ overflowY: 'auto', maxHeight: 'calc(100vh - 160px)' }}>
                        <Grid align='center'>
                            <Avatar className={classes.avatarStyle}><LockOutlinedIcon /></Avatar>
                            <h2>{isSignup ? "Signup" : "Login"}</h2>
                        </Grid>
                        {isSignup && (<TextField className={classes.m8} label='Firstname' placeholder='Enter First Name' name="firstname" type='text' value={inputs.firstname} onChange={handleChange} fullWidth required autoFocus  />)}

                        {isSignup && (<TextField className={classes.m8}label='Lastname' placeholder='Enter Last Name' name="lastname" type='text' value={inputs.lastname} onChange={handleChange} fullWidth required />)}

                        <TextField className={classes.m8} label="Username"  placeholder='Enter Username' type='text' name='username' value={inputs.username} onChange={handleChange} fullWidth required autoFocus />

                        {isSignup && (<TextField className={classes.m8} label='Email' placeholder='Enter Email' type='email' name='email' value={inputs.email} onChange={handleChange} fullWidth required />)}

                        <TextField className={classes.m8} label='Password' placeholder='Enter password' name='password' value={inputs.password} onChange={handleChange} type='password' fullWidth required />
                        

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