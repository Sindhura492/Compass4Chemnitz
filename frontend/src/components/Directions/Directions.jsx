import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemSecondaryAction, ListItemText, Tab, Tabs, Tooltip, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useMapsLibrary, useMap } from '@vis.gl/react-google-maps';
import { generateURL } from '../../general';
import api, { routes } from '../../api';
import { getResponseError } from '../../utils/errorUtils';
import useStyles from './styles';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import DirectionsTransitIcon from '@mui/icons-material/DirectionsTransit';

const Directions = ({ destination, onClose, loading, error }) => {
    const classes = useStyles();
    const map = useMap();
    const routesLibrary = useMapsLibrary('routes');
    const [directionsService, setDirectionsService] = useState();
    const [directionsRenderer, setDirectionsRenderer] = useState();
    const [listOfRoutes, setListOfRoutes] = useState([]);
    const [routeIndex, setRouteIndex] = useState(0);
    const selected = listOfRoutes[routeIndex];
    const leg = selected?.legs[0];
    const [tabsTime, setTabTime] = useState('-');

    const [open, setOpen] = useState(false);
    const [listOfAddress, setListOfAddress] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [travelMode, setTravelMode] = useState('DRIVING'); // Default travel mode
    const userId = localStorage.getItem('user_id');

    // Fetch user addresses
    const fetchAddress = async () => {
        loading(true);
        try {
            const addressUrl = generateURL(routes.getAddress, { id: userId });
            const addRes = await api.get(addressUrl);
            setOpen(true);
            setListOfAddress(addRes.data);
        } catch (err) {
            const errorData = getResponseError(err);
            error(errorData);
        } finally {
            loading(false);
        }
    };

    // Initialize directions service and renderer
    useEffect(() => {
        if (!routesLibrary || !map || !travelMode) return;
        setDirectionsService(new routesLibrary.DirectionsService());
        setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
    }, [routesLibrary, map, travelMode]);

    // Fetch directions when address or travel mode changes
    useEffect(() => {
        if (!directionsService || !directionsRenderer || !selectedAddress) return;
        const coordinates = { lat: selectedAddress.latitude, lng: selectedAddress.longitude };

        // Clear previous directions and markers
        directionsRenderer.setDirections({ routes: [] });

        directionsService
            .route({
                origin: coordinates,
                destination: destination,
                travelMode: google.maps.TravelMode[travelMode],
                provideRouteAlternatives: true
            })
            .then(response => {
                directionsRenderer.setDirections(response);
                setListOfRoutes(response.routes);
                setRouteIndex(0);

            })
            .catch(err => {
                console.error('Error fetching directions:', err);
            });

        return () => { directionsRenderer.setMap(null); }
    }, [directionsService, directionsRenderer, selectedAddress, travelMode, destination]);



    // Update direction route
    useEffect(() => {
        if (directionsRenderer && listOfRoutes.length > 0) {
            directionsRenderer.setRouteIndex(routeIndex);
        }
    }, [routeIndex, directionsRenderer, listOfRoutes]);

    // Fetch addresses on mount
    useEffect(() => {
        fetchAddress();
    }, []);

    const handleCloseSidebar = () => {
        setOpen(false);
        onClose();
    };

    const handleSelectedAddress = (address) => {
        setSelectedAddress(address);
    };

    const handleTravelModeChange = (event, newMode) => {
        setTravelMode(newMode);
    };

    const formatDuration = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const remainingSeconds = seconds % 3600;

        const minutes = Math.floor(remainingSeconds / 60);
        const remainingSecondsAfterMinutes = remainingSeconds % 60;

        // Ensure two-digit formatting for all units
        const formattedHours = hours.toString();
        const formattedMinutes = minutes.toString();
        const formattedSeconds = remainingSecondsAfterMinutes.toString();

        const minAdd = (remainingSecondsAfterMinutes > 20 ? minutes + 1 : minutes).toString();
        if (hours > 0) {
            return `${formattedHours} hr ${minAdd} min`
        } else {
            return `${minAdd} min`;
        }
    }


    return (
        <Box className={`${classes.sidebar} ${open ? classes.sidebarOpen : ''}`}>
            <Box className={classes.drawerHeader}>
                <Typography variant="h6">{selectedAddress ? 'Directions' : 'Select Address'}</Typography>
                <IconButton onClick={handleCloseSidebar} className={classes.closeButton}>
                    <CloseIcon />
                </IconButton>
            </Box>
            {!selectedAddress && (
                <List className={classes.scrollbar}>
                    {listOfAddress.map((address, index) => (
                        <React.Fragment key={index}>
                            <ListItem>
                                <ListItemButton onClick={() => handleSelectedAddress(address)}>
                                    <ListItemText
                                        primary={`${address?.house_no}, ${address?.street_name}`}
                                        secondary={
                                            <>
                                                {address.postalcode && (<>
                                                    <Typography component={'span'} variant="body2" color="text.primary">{address?.postalcode}</Typography><br /></>)}
                                                <Typography component={'span'} variant="body2" color="text.secondary">{address?.city}</Typography><br />
                                                <Typography component={'span'} variant="body2" color="text.secondary">{address?.state}</Typography><br />
                                            </>
                                        }
                                    />
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    ))}
                </List>)}

            {selectedAddress && (
                <>
                    <>
                        <Tabs
                            value={travelMode}
                            onChange={handleTravelModeChange}
                            className={classes.tabs}
                        >
                            <Tab icon={<DirectionsCarIcon />} label="11min" value="DRIVING" />
                            {/* <Tab icon={<DirectionsTransitIcon />} label="11min" value="TRANSIT" /> */}
                            <Tab icon={<DirectionsWalkIcon />} label="11min" value="WALKING" />
                            <Tab icon={<DirectionsBikeIcon />} label="11min" value="BICYCLING" />
                        </Tabs>
                    </>

                    {selected ? (
                        <List>
                        {listOfRoutes.map((route, index) => (
                            <ListItemButton key={index} selected={index === routeIndex} onClick={() => setRouteIndex(index)} className={index === routeIndex ? classes.selectedItem : ''} sx={{ pb: 4 }}>
                                {/* <Grid container spacing={1}>
                                            <Grid item xs={8}> */}
                                <ListItemAvatar sx={{minWidth: 0, mr: 1}}>
                                    {travelMode === 'DRIVING' ? <DirectionsCarIcon /> : travelMode === 'WALKING' ? <DirectionsWalkIcon /> : <DirectionsBikeIcon />}
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`via ${route.summary}`}
                                    primaryTypographyProps={{ style: { whiteSpace: 'pre-wrap' } }}
                                    sx={{ maxWidth: 'calc(100vw - 87vw)' }}
                                />
                                {/* </Grid>
                                            <Grid item xs={4}> */}
                                <ListItemSecondaryAction>
                                    <Typography variant="body2" align="right">
                                        {route.legs[0].distance?.text}
                                    </Typography>
                                    <Typography variant="caption" align="right">
                                        {formatDuration(route.legs[0].duration?.value)}
                                    </Typography>
                                </ListItemSecondaryAction>
                                {/* </Grid>
                                        </Grid> */}
                            </ListItemButton>
                        ))}
                    </List>
                    ) : (
                        <Typography variant="body2">Loading directions...</Typography>
                    )}
                    
                </>
            )}

        </Box>
    );
}

export default Directions;