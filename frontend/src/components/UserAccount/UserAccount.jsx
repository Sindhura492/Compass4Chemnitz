import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import { Box, Button, Container, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, FormControlLabel, FormHelperText, IconButton, Paper, Switch, TextField, ThemeProvider, Tooltip, Typography } from '@mui/material'
import api, { routes } from '../../api';
import { getResponseError, getResponseInfo } from '../../utils/errorUtils';
import Loader from '../Loader/Loader';
import ErrorHandler from '../ErrorHandler/ErrorHandler';
import { generateURL } from '../../general';
import { useNavigate } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { theme } from '../../utils/themeProvider'
import useStyles from './styles'
import Footer from '../Footer/Footer';

const UserAccount = () => {
    const classes = useStyles();
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [userDetails, setUserDetails] = useState(null);
    const [address, setAddress] = useState(null);

    const [open, setOpen] = useState(false);
    const [dialogAddressDetails, setDialogAddressDetails] = useState({
        houseNo: '',
        streetName: '',
        postalcode: '',
        city: "Chemnitz",
        state: "Saxony",
        country: "Germany",
        id: ''
    });
    const [typeOfDialog, setTypeOfDialog] = useState(null);

    const [addressError, setAddressError] = useState({
        houseNo: '',
        postalcode: '',
        streetName: ''
    });

    const [isValid, setIsValid] = useState(false);
    const [isSuperUser, setIsSuperUser] = useState(false);


    const [dialogOpen, setDialogOpen] = useState(false);
    const [tempSuperUser, setTempSuperUser] = useState(false);

    const [showFooter, setShowFooter] = useState(true);
    const [deleteUser, setDeleteUser] = useState(false);
    const [message, setMessage] = useState(null);

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
            setAddress(null);
            if (errorData?.message?.detail != 'Please add atleast one address to calculate distances..') {
                setError(errorData);
            }
        } finally {
            setLoading(false);
        }
    };

    const setDefaultSwitchValue = (data) => {
        if (data.role === 1) {
            setIsSuperUser(true);
        } else {
            setIsSuperUser(false);
        }
    }



    const handleClickOpen = (add, type) => {
        setTypeOfDialog(type);
        if (type === 'edit') {
            setShowFooter(false);
            setDialogAddressDetails({
                houseNo: add.house_no,
                streetName: add.street_name,
                postalcode: add.postalcode || '',
                city: add.city,
                state: add.state,
                country: add.country,
                id: add.id
            })
            setOpen(true);


        } else if (type === 'delete') {
            setDialogAddressDetails({
                houseNo: add.house_no,
                streetName: add.street_name,
                postalcode: add.postalcode || '',
                city: add.city,
                state: add.state,
                country: add.country,
                id: add.id
            })
            setMessage("Are you sure you want to delete this address?");
            setShowFooter(false);
            setDialogOpen(true);
        } else {
            setShowFooter(false);
            setOpen(true);
        }

    };

    const handleClose = () => {
        setShowFooter(true);
        setDialogAddressDetails({
            houseNo: "",
            streetName: "",
            city: "Chemnitz",
            state: "Saxony",
            country: "Germany",
            postalcode: "",
            id: ""
        })
        setAddressError({
            houseNo: '',
            postalcode: '',
            streetName: ''
        })
        setOpen(false);
    };

    const handleSaveAddress = async () => {
        const { houseNo, streetName, postalcode } = dialogAddressDetails;
        const errors = {
            houseNo: '',
            streetName: '',
            postalcode: ''
        };
        let valid = true;

        if (!houseNo) {
            errors.houseNo = 'House Number is required.';
            valid = false;
        }

        if (!streetName) {
            errors.streetName = 'Street Name is required.';
            valid = false;
        }

        if (!postalcode) {
            errors.postalcode = 'Postal Code is required.';
            valid = false;
        }

        setAddressError(errors);

        if (!valid) {
            setIsValid(false);
            return;
        }
        if (typeOfDialog === 'add') {
            try {
                const data = {
                    house_no: dialogAddressDetails.houseNo,
                    street_name: dialogAddressDetails.streetName,
                    postalcode: dialogAddressDetails.postalcode,
                    city: dialogAddressDetails.city,
                    state: dialogAddressDetails.state,
                    country: dialogAddressDetails.country,
                    user: userId
                }
                const saveAddress = generateURL(routes.saveAddress);
                const saveRes = await api.post(saveAddress, data);
                const responseData = getResponseInfo(saveRes);
                setError(responseData);
                await getAddressDetails();
            } catch (error) {
                const errorData = getResponseError(error);
                setError(errorData);
            }
            handleClose();
        } else if (typeOfDialog === 'edit') {
            try {
                const data = {
                    house_no: dialogAddressDetails.houseNo,
                    street_name: dialogAddressDetails.streetName,
                    postalcode: dialogAddressDetails.postalcode,
                    city: dialogAddressDetails.city,
                    state: dialogAddressDetails.state,
                    country: dialogAddressDetails.country
                }
                const editAddress = generateURL(routes.editAddress, { id: dialogAddressDetails.id });
                const editRes = await api.put(editAddress, data);
                const responseData = getResponseInfo(editRes);
                setError(responseData);
                await getAddressDetails();
            } catch (error) {
                const errorData = getResponseError(error);
                setError(errorData);
            }
            handleClose();
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

        if (name === "postalcode") {
            if (!/^\d*$/.test(value)) {
                isValid = false;
                setAddressError((prevState) => ({
                    ...prevState,
                    postalcode: 'Postalcode must be numeric.',
                }));
            } else {
                setAddressError((prevState) => ({
                    ...prevState,
                    postalcode: '',
                }));
            }
        }

        if (isValid) {
            setIsValid(true);
            setDialogAddressDetails((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }

    }

    const deleteUserDialog = () => {
        setDeleteUser(true);
        setMessage("Are you sure you want to delete the account?");
        setShowFooter(false);
        setDialogOpen(true);
    }

    const deleteUserApi = async () => {
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
        setLoading(false);

    }

    const triggerChangeRoleApi = async () => {
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
            setMessage("All the favorites and addresses will be deleted by this action. Are you sure you want to continue?");
            setShowFooter(false);
            setDialogOpen(true);
        }
    };

    const triggerDeleteAddressApi = async () => {
        setLoading(true);
        try {
            const deleteAddressUrl = generateURL(routes.deleteAddress, { id: dialogAddressDetails.id });
            let res = await api.delete(deleteAddressUrl);
            const response = getResponseInfo(res);
            setError(response);
            await getAddressDetails();
        } catch (error) {
            const errorData = getResponseError(error);
            setError(errorData);
        } finally {
        }
        setLoading(false);
    }



    const handleDialogClose = async (confirmed) => {
        if (typeOfDialog === 'delete') {
            if (confirmed) {
                triggerDeleteAddressApi();
                setDialogAddressDetails({
                    houseNo: "",
                    streetName: "",
                    city: "Chemnitz",
                    state: "Saxony",
                    country: "Germany",
                    postalcode: "",
                    id: ""
                })
                setAddressError({
                    houseNo: '',
                    postalcode: '',
                    streetName: ''
                })
            } else {
                setTypeOfDialog(null);
            }
        } else if (deleteUser){
            if (confirmed) {
                await deleteUserApi();
            } else {
                setDeleteUser(false)
            }
        } 
        else {
            if (confirmed) {
                setIsSuperUser(tempSuperUser);
                await triggerChangeRoleApi();
                setAddress(null);
                await getAddressDetails();
            } else {
                setIsSuperUser(!tempSuperUser);
            }
        }
        // setMessage(null);
        setDialogOpen(false);
        setShowFooter(true);
    };

    const naviagteToHome = () => {
        navigate('/');
    }


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {isLoading && <Loader />}

            <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>

            <Header isLoginPage={false} />

            {!isLoading && <Container maxWidth="md" sx={{ p: 3, flex: '1 0 auto' }}>
                <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                    <IconButton size="small" onClick={naviagteToHome}>
                        <ArrowBackIosNewIcon />
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
                            <Button variant="contained" onClick={deleteUserDialog} color="error" sx={{ mt: 1 }}>
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
                            <Tooltip title="Super user enables user to add more addresses." arrow enterTouchDelay={0} leaveTouchDelay={3000}>
                                <IconButton size="small" className={classes.switchIconPosition} >
                                    <InfoIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </Box>

                        {address && address?.map((add, index) => (
                            <Box key={index}>
                                {index > 0 ? <Divider sx={{ m: 1, opacity: 0.9 }} /> : null}

                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography variant="body1" gutterBottom>
                                        {`Address ${index + 1}`}
                                    </Typography>
                                    <Box>
                                        <Button startIcon={<EditIcon />} size="small" variant="primary" onClick={() => { handleClickOpen(add, 'edit') }}>Edit</Button>
                                        <Button startIcon={<DeleteIcon />} size="small" variant="primary" onClick={() => { handleClickOpen(add, 'delete') }}>Delete</Button>
                                    </Box>
                                </Box>

                                <TextField margin="dense" label='House No' defaultValue={add.house_no} fullWidth disabled />
                                <TextField margin="dense" label='Street Name' defaultValue={add.street_name} fullWidth disabled />
                                <TextField margin="dense" label='Postalcode' defaultValue={add.postalcode} fullWidth disabled />
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

                    <Button variant="contained" color="primary" onClick={() => { handleClickOpen(null, 'add') }}>
                        Add Address
                    </Button>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>{dialogAddressDetails.houseNo != '' ? 'Edit Address' :  'Add Address'}</DialogTitle>
                        <DialogContent>
                            <Box>
                                <TextField autoFocus fullWidth margin="dense" label="House No." placeholder="Enter House No" name="houseNo" type="text" value={dialogAddressDetails.houseNo} onChange={handleChange} required error={!!addressError.houseNo} helperText={addressError.houseNo} />
                                <TextField margin="dense" label='Street Name' placeholder='Enter Street Name' name="streetName" type='text' value={dialogAddressDetails.streetName} onChange={handleChange} fullWidth required error={!!addressError.streetName} helperText={addressError.streetName} />
                                <TextField fullWidth margin="dense" label="Postalcode" placeholder="Enter Postalcode" name="postalcode" type="text" value={dialogAddressDetails.postalcode} onChange={handleChange} required error={!!addressError.postalcode} helperText={addressError.postalcode} />
                                <TextField margin="dense" label='City' placeholder='Enter City' name="city" type='text' value={dialogAddressDetails.city} fullWidth required disabled />
                                <TextField margin="dense" label='State' placeholder='Enter State' name="state" type='text' value={dialogAddressDetails.state} fullWidth required disabled />
                                <TextField margin="dense" label='Country' placeholder='Enter Country' name="country" type='text' value={dialogAddressDetails.country} fullWidth required disabled />
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleSaveAddress} color="primary" disabled={!isValid}>
                                {typeOfDialog === 'add' || typeOfDialog === 'edit' ? 'Save' : 'Delete'}
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
                                {message}
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
            <Footer show={showFooter} />
            </Box>
        </ThemeProvider>
    )
}

export default UserAccount;