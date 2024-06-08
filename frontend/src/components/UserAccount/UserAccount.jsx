import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import { Box, Button, Container, CssBaseline, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, Grid, Paper, TextField, ThemeProvider, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { theme } from '../../utils/themeProvider'
import useStyles from './styles'
import api, { routes } from '../../api';
import { getResponseError } from '../../utils/errorUtils';
import Loader from '../Loader/Loader';
import ErrorHandler from '../ErrorHandler/ErrorHandler';
import { generateURL } from '../../general';

const UserAccount = () => {
    const classes = useStyles();
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [userDetails, setUserDetails] = useState(null);
    const [address, setAddress] = useState(null);
    
    const [open, setOpen] = useState(false);
    const [addAddress, setAddAddress] = useState({
        houseNo: '',
        streetName: '',
        city: "Chemnitz",
        state: "Saxony",
        country: "Germany",
    });

    const [addressError, setAddressError] = useState({
        houseNo: ''
    });

    const [isValid, setIsValid] = useState(false);
    
    const userId = localStorage.getItem('user_id');



    useEffect(() => {
        const getUserDetails = async () => {
            setLoading(true);
            try {
                const userUrl = generateURL(routes.getUserInfo, { id: userId });
                const res = await api.get(userUrl);
                setUserDetails(res.data);
            } catch (error) {
                const errorData = getResponseError(error);
                setError(errorData);
            } finally {
                // setLoading(false);
            }
        };

        const getAddressDetails = async () => {
            try {
                const addressUrl = generateURL(routes.getAddress, { id: userId });
                const addRes = await api.get(addressUrl);
                setAddress(addRes.data);
            } catch (error) {
                const errorData = getResponseError(error);
                setError(errorData);
            } finally {
                setLoading(false);
            }
        };
        getUserDetails();
        getAddressDetails();
    }, []);




    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setAddAddress({
            houseNo: "",
            streetName: "",
            city: "Chemnitz",
            state: "Saxony",
            country: "Germany",
        })
        setOpen(false);
    };

    const handleSaveAddress = async () => {
        try {
            const data = {
                house_no: addAddress.houseNo,
                street_name: addAddress.streetName,
                city: addAddress.city,
                state: addAddress.state,
                country: addAddress.country,
                user: userId
            }
            const saveAddress = generateURL(routes.saveAddress);
            const saveRes = await api.post(saveAddress, data);
            await getAddressDetailsAgain();
        } catch (error) {
            const errorData = getResponseError(error);
            setError(errorData);
        }
        handleClose();
    };

    const getAddressDetailsAgain = async () => {
        setLoading(true);
        try {
            const addressUrl = generateURL(routes.getAddress, { id: userId });
            const addRes = await api.get(addressUrl);
            setAddress(addRes);
        } catch (error) {
            const errorData = getResponseError(error);
            setError(errorData);
        } finally {
            setLoading(false);
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        let isValid = true;
        setIsValid(false);

        if (name === "houseNo") {
            // Validate that houseNo is numeric
            if (!/^\d*$/.test(value)) {
                isValid = false;
                setAddressError((prevState) => ({
                    ...prevState,
                    houseNo: 'House Number must be numeric.',
                }));
            } else {
                setAddressError((prevState) => ({
                    ...prevState,
                    houseNo: '',
                }));
            }
        }

        if (isValid) {
            setIsValid(true);
            setAddAddress((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }

    }

    const deleteAddress = (addressDelete, index) => {

    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {isLoading && <Loader />}
            <Header />

            {!isLoading && <Container maxWidth="md" sx={{ p: 3, mt: 5 }}>
                <Typography variant="h5" gutterBottom>
                    Account Settings
                </Typography>
                <Paper elevation={3} sx={{ p: 3, mt: 5 , bgcolor: 'secondary.main'}}>
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
                            {address && <Box mt={{ xs: 2, sm: 0 }}>
                                <Typography variant="h6" gutterBottom>
                                    Address
                                </Typography>
                                {address && address?.map((add, index) => (
                                    <Box key={index}>
                                        <Box display="flex" justifyContent="space-between" alignItems="center">
                                            <Typography variant="body1" gutterBottom>
                                                {`Address ${index + 1}`}
                                            </Typography>
                                            <Button startIcon={<DeleteIcon />} size="small" variant="text" onClick={deleteAddress(add, index)}>Delete</Button>
                                        </Box>
                                        <TextField margin="dense" label='House No' defaultValue={add.house_no} fullWidth disabled />
                                        <TextField margin="dense" label='Street Name' defaultValue={add.street_name} fullWidth disabled />
                                        <TextField margin="dense" label='City' defaultValue={add.city} fullWidth disabled />
                                        <TextField margin="dense" label='State' defaultValue={add.state} fullWidth disabled />
                                        <TextField margin="dense" label='Country' defaultValue={add.country} fullWidth disabled />

                                    </Box>
                                ))}
                            </Box>
                            }
                            {!address && <Box>
                                <Typography variant="h6" gutterBottom> Address </Typography>
                                <Typography variant="body1" gutterBottom> No Address Added </Typography>
                            </Box>}

                            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                                Add Address
                            </Button>
                            <Dialog open={open} onClose={handleClose}>
                                <DialogTitle>Add Address</DialogTitle>
                                <DialogContent>
                                    <Box>
                                        <FormControl fullWidth error={!!addAddress.houseNo} margin="dense">
                                            <TextField autoFocus label="House No." placeholder="Enter House No" name="houseNo" type="text" value={addAddress.houseNo} onChange={handleChange} required />
                                            {addressError.houseNo && (
                                                <FormHelperText>{addressError.houseNo}</FormHelperText>
                                            )}
                                        </FormControl>
                                        <TextField margin="dense" label='Street Name' placeholder='Enter Street Name' name="streetName" type='text' value={addAddress.streetName} onChange={handleChange} fullWidth required />
                                        <TextField margin="dense" label='City' placeholder='Enter City' name="city" type='text' value={addAddress.city} fullWidth required disabled />
                                        <TextField margin="dense" label='State' placeholder='Enter State' name="state" type='text' value={addAddress.state} fullWidth required disabled />
                                        <TextField margin="dense" label='Country' placeholder='Enter Country' name="country" type='text' value={addAddress.country} fullWidth required disabled />
                                    </Box>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} color="primary">
                                        Cancel
                                    </Button>
                                    <Button onClick={handleSaveAddress} color="primary" disabled={!isValid}>
                                        Save
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>}

            {error && <ErrorHandler error={error} onClose={() => setError(null)} />}
        </ThemeProvider>
    )
}

export default UserAccount;