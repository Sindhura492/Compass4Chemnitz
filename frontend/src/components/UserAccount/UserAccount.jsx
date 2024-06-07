import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import { Avatar, Box, Button, Container, CssBaseline, Divider, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, TextField, ThemeProvider, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { theme } from '../../utils/themeProvider'
import useStyles from './styles'
import api, { routes } from '../../api';
import { generateURL } from '../../constants';
import { getResponseError } from '../../utils/errorUtils';
import Loader from '../Loader/Loader';
import ErrorHandler from '../ErrorHandler/ErrorHandler';

const UserAccount = () => {
    const classes = useStyles();
    const [isLoading, setLoading] = useState(false);
    // const [error, setError] = useState(null);

    const [userDetails, setUserDetails] = useState(null);
    const [address, setAddress] = useState(null);


    useEffect(() => {
        const getUserDetails = async () => {
            setLoading(true);
            try {
                const url = generateURL(routes.getUserInfo, { id: 4 });
                const res = await api.get(url);
                setUserDetails(res.data); // Set the user details in state
            } catch (error) {
                const errorData = getResponseError(error);
                // setError(errorData);
            } finally {
                setLoading(false);
            }
        };

        getUserDetails();
    }, []);
        
    console.log("kokokok", userDetails);


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            {isLoading && <Loader />}

            {!isLoading && <Container maxWidth="md" sx={{ p: 3, mt: 5 }}>
                {/* <TextField fullWidth label="First Name" defaultValue={userDetails?.first_name} margin="dense" disabled /> */}

                {/* <Paper elevation={3} sx={{ p: 3, mt: 5 }}> */}
                <Typography variant="h5" gutterBottom>
                    Account Settings
                </Typography>
                <Paper elevation={3} sx={{ p: 3, mt: 5 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            {/* <Box display="flex" alignItems="center">
                                <Avatar alt="Thomas Smith" src="/path/to/profile-image.jpg" sx={{ width: 80, height: 80, mr: 2 }} />
                                <Box>
                                    <Typography variant="h6">Thomas Smith</Typography>
                                    <Typography variant="subtitle1" color="textSecondary">CEO & Co-Founder</Typography>
                                    <Button startIcon={<EditIcon />} size="small" color="primary">Edit</Button>
                                </Box>
                            </Box> */}
                            <Box>
                                <Typography variant="h6" gutterBottom>
                                    Personal Information
                                </Typography>
                                <Box>
                                    <TextField fullWidth label="First Name" defaultValue={userDetails?.first_name} margin="dense" disabled />
                                    <TextField fullWidth label="Last Name" defaultValue={userDetails?.last_name} margin="dense" disabled />
                                    <TextField fullWidth label="Email" defaultValue={userDetails?.email} margin="dense" disabled />
                                    <TextField fullWidth label="Username" defaultValue={userDetails?.user_name} margin="dense" disabled />
                                    {/* <TextField fullWidth label="Password" defaultValue="+1 817 718 8273" margin="dense" disabled /> */}
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Box mt={{ xs: 2, sm: 0 }}>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography variant="h6" gutterBottom>
                                        Address
                                    </Typography>
                                    <Button startIcon={<AddIcon />} size="small" color="primary">Add</Button>
                                </Box>
                                <Typography variant="body1" gutterBottom>
                                    Address 1
                                </Typography>
                                <Box>
                                    <TextField fullWidth label="Country" defaultValue="United States of America" margin="dense" />
                                    <TextField fullWidth label="State" defaultValue="NY" margin="dense" />
                                    <TextField fullWidth label="City" defaultValue="New York City" margin="dense" />
                                    <TextField fullWidth label="Postal Code" defaultValue="10011" margin="dense" />
                                </Box>
                                <Typography variant="body1" gutterBottom>
                                    Address 1
                                </Typography>
                                <Box>
                                    <TextField fullWidth label="Country" defaultValue="United States of America" margin="dense" />
                                    <TextField fullWidth label="State" defaultValue="NY" margin="dense" />
                                    <TextField fullWidth label="City" defaultValue="New York City" margin="dense" />
                                    <TextField fullWidth label="Postal Code" defaultValue="10011" margin="dense" />
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
                {/* </Paper>/ */}
            </Container>}

            {/* {error && <ErrorHandler error={error} onClose={() => setError(null)} />} */}


        </ThemeProvider>
    )
}

export default UserAccount;