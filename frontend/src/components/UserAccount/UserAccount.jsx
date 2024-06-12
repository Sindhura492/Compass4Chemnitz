import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import { Box, Button, Container, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormHelperText, IconButton, Paper, Switch, TextField, ThemeProvider, Tooltip, Typography } from '@mui/material'
import api, { routes } from '../../api';
import { getResponseError, getResponseInfo } from '../../utils/errorUtils';
import Loader from '../Loader/Loader';
import ErrorHandler from '../ErrorHandler/ErrorHandler';
import { generateURL } from '../../general';
import { useNavigate } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { theme } from '../../utils/themeProvider'
import useStyles from './styles'

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
    const [isSuperUser, setIsSuperUser] = useState(false);


    const [dialogOpen, setDialogOpen] = useState(false);
    const [tempSuperUser, setTempSuperUser] = useState(false);

    const userId = localStorage.getItem('user_id');
    const navigate = useNavigate();




    useEffect(() => {
        getUserDetails();
        getAddressDetails();
    }, []);

    const getUserDetails = async () => {
        setLoading(true);
        try {
            const userUrl = generateURL(routes.getUserInfo, { id: userId });
            const res = await api.get(userUrl);
            setUserDetails(res.data);
            setDefaultSwitchValue(res.data)
        } catch (error) {
            const errorData = getResponseError(error);
            setError(errorData);
        } finally {
        }
    };

    const getAddressDetails = async () => {
        setLoading(true);
        try {
            const addressUrl = generateURL(routes.getAddress, { id: userId });
            const addRes = await api.get(addressUrl);
            setAddress(addRes.data);
        } catch (error) {
            const errorData = getResponseError(error);

            if (errorData?.message?.detail != 'Please add atleast one address to calculate distances..') {
                setError(errorData);
            }
        } finally {
            setLoading(false);
        }
    };

    const setDefaultSwitchValue = (data) => {
        if (data.role === '1') {
            setIsSuperUser(true);
        } else {
            setIsSuperUser(false);
        }
    }



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
            await getAddressDetails();
        } catch (error) {
            const errorData = getResponseError(error);
            setError(errorData);
        }
        handleClose();
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

    const deleteUser = async () => {
        setLoading(true);
        try {
            const deactivateAccountUrl = generateURL(routes.deactivateUser, { id: userId });
            let res = await api.put(deactivateAccountUrl);
            const errorData = getResponseError(res);
            setError(res);
        } catch (error) {
            const errorData = getResponseError(error);
            setError(errorData);
        } finally {
            navigate('/logout')
        }

    }

    const triggerChangeRoleApi = async (value) => {
        setLoading(true);
        try {
            const changeRoleUrl = generateURL(routes.changeRole, { id: userId });
            let res = await api.put(changeRoleUrl);
            const response = getResponseInfo(res);
            setError(response);
            setUserDetails(res?.data?.data);
        } catch (error) {
            const errorData = getResponseError(error);
            setError(errorData);
        } finally {
            setLoading(false);
        }
    }

    const handleSwitchChange = (event) => {
        const targetValue = event.target.checked;

        if (targetValue) {
            // Turn on the switch and trigger the API
            setIsSuperUser(targetValue);
            triggerChangeRoleApi();
        } else {
            // Show the dialog when switching off
            setTempSuperUser(targetValue);
            setDialogOpen(true);
        }
    };

    const handleDialogClose = (confirmed) => {
        setDialogOpen(false);
        if (confirmed) {
            setIsSuperUser(tempSuperUser);
            triggerChangeRoleApi();
        } else {
            setIsSuperUser(!tempSuperUser);
        }
    };

    const naviagteToHome = () => {
        navigate('/');
    }


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {isLoading && <Loader />}
            <Header isLoginPage={false} />

            {!isLoading && <Container maxWidth="md" sx={{ p: 3 }}>
                <Box display="flex" alignItems="center" sx={{mb: 1}}>
                    <IconButton size="small">
                        <ArrowBackIosNewIcon onClick={naviagteToHome}/>
                    </IconButton>
                    <Typography variant="h5">
                        Account Settings
                    </Typography>
                </Box>
                <Paper elevation={3} sx={{ p: 3, bgcolor: 'secondary.main' }}>
                    {/* <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}> */}
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
                            <Button variant="contained" onClick={deleteUser} color="primary" sx={{ mt: 1 }}>
                                Delete Account
                            </Button>
                            {/* <TextField fullWidth label="Password" defaultValue="+1 817 718 8273" margin="dense" disabled /> */}
                        </Box>
                    </Box>
                    {/* </Grid> */}
                    {/* <Grid item xs={12} sm={6}> */}

                    {/* </Grid>
                    </Grid> */}
                </Paper>


                <Paper elevation={3} sx={{ p: 3, mt: 2, bgcolor: 'secondary.main' }}>
                    {address && <Box>
                        <Typography variant="h6" gutterBottom>
                            Address
                        </Typography>
                        <Box className={classes.switchBox}>
                            <FormControlLabel
                                control={
                                    <Switch checked={isSuperUser} onChange={handleSwitchChange} name="superUser" />
                                }
                                label="Super User"
                                sx={{ m: 0 }}
                            />
                            <Tooltip title="Switch user enables user to add more addresses." arrow enterTouchDelay={0} leaveTouchDelay={3000}>
                                <IconButton size="small" className={classes.switchIconPosition} >
                                    <InfoIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </Box>

                        {address && address?.map((add, index) => (
                            <Box key={index}>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography variant="body1" gutterBottom>
                                        {`Address ${index + 1}`}
                                    </Typography>
                                    {/* <Button startIcon={<DeleteIcon />} size="small" variant="text" onClick={deleteAddress(add, index)}>Delete</Button> */}
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
                        <Box className={classes.switchBox}>
                            <FormControlLabel
                                control={
                                    <Switch checked={isSuperUser} onChange={handleSwitchChange} name="superUser" />
                                }
                                label="Super User"
                                sx={{ m: 0 }}
                            />
                            <Tooltip title="This switch grants super user privileges." arrow enterTouchDelay={0}>
                                <IconButton size="small" className={classes.switchIconPosition} >
                                    <InfoIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </Box>
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

                    <Dialog
                        open={dialogOpen}
                        onClose={() => handleDialogClose(false)}
                    >
                        <DialogTitle id="alert-dialog-title">{"Confirm Action"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                All the favourites and addresses will be deleted by this action. Are you sure you want to continue?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => handleDialogClose(false)} color="primary">
                                No
                            </Button>
                            <Button onClick={() => handleDialogClose(true)} color="primary" autoFocus>
                                Yes
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Paper>
            </Container>}

            {error && <ErrorHandler error={error} onClose={() => { setError(null) }} />}
        </ThemeProvider>
    )
}

export default UserAccount;