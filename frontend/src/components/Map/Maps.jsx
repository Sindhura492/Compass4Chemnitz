// import GoogleMapReact from 'google-map-react';
"use client";
import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import { Box, Button, ButtonGroup, Drawer, IconButton, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import { APIProvider, AdvancedMarker, Map, Pin } from '@vis.gl/react-google-maps';
import CloseIcon from '@mui/icons-material/Close';

const Maps = () => {
  const classes = useStyles();
  const coordinates = { lat: 43.64, lng: -79.41 };
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // console.log(googleMapsApiKey);

  const mapId = import.meta.env.VITE_MAP_ID;

  const trees = [
    [1, "Ash, green", 43.6495364521731, -79.41618733111581],
    [2, "Birch, white", 443.8837189558964, -79.3545349538418],
    [3, "pine", 43.6832688003495, -79.3044252718078]
  ]

  const mapOptions = {
    mapTypeControl: false,  // Disable Map/Satellite control
  };
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const fetchPlaces = (category) => {
    setSelectedCategory(category);
    setIsDrawerOpen(true);
    setIsSidebarOpen(true);
    // if (typeof google !== 'undefined' && google.maps) {
    //   const service = new google.maps.places.PlacesService(document.createElement('div'));
    //   const request = {
    //     location: new google.maps.LatLng(coordinates.lat, coordinates.lng),
    //     radius: '1500',
    //     type: [category],
    //   };
    //   service.nearbySearch(request, (results, status) => {
    //     if (status === google.maps.places.PlacesServiceStatus.OK) {
    //       setPlaces(results);
    //     }
    //   });
    // }
  };

  const renderPlacesList = () => {
    return (
      <List className={classes.list}>
        {trees.map((place) => (
          <ListItem key={place[0]}>
            <ListItemText primary={place[1]} secondary={place[1]} />
          </ListItem>
        ))}
      </List>
    );
  };


  return (
    <APIProvider apiKey={googleMapsApiKey}>
      <Box className={classes.root}>
        <Box className={`${classes.sidebar} ${isSidebarOpen ? classes.sidebarOpen : ''}`}>
          <Box className={classes.drawerHeader}>
            <IconButton onClick={() => setIsSidebarOpen(false)} className={classes.closeButton}>
              <CloseIcon />
            </IconButton>
          </Box>
          {renderPlacesList()}
        </Box>
        <Box className={classes.mapContainer}>
          <Box className={classes.buttonContainer}>
            <Button variant="contained" onClick={() => fetchPlaces('restaurant')}>Restaurants</Button>
            <Button variant="contained" onClick={() => fetchPlaces('hotel')}>Hotels</Button>
            <Button variant="contained" onClick={() => fetchPlaces('atm')}>ATMs</Button>
          </Box>
          <Map defaultZoom={14} defaultCenter={coordinates} mapId={mapId} options={mapOptions}>
            {trees.map((place) => (
              <AdvancedMarker position={{ lat: place[2], lng: place[3] }} key={place[0]}>
                <Pin background={"grey"} borderColor={"green"} glyphColor={"purple"} />
              
              </AdvancedMarker>
            ))}
          </Map>
        </Box>
      </Box>
    </APIProvider>
  )
}

export default Maps