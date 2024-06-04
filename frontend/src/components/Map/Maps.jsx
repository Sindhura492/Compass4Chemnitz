// import GoogleMapReact from 'google-map-react';
"use client";
import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import { Box, Button, ButtonGroup, Card, CardContent, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemButton, ListItemText, Paper, Tooltip, Typography } from '@mui/material';
import { APIProvider, AdvancedMarker, Map, Pin } from '@vis.gl/react-google-maps';
import CloseIcon from '@mui/icons-material/Close';
import { categories } from '../../constants';
import api, { routes } from '../../api';
import DirectionsRoundedIcon from '@mui/icons-material/DirectionsRounded';

const Maps = () => {
  const classes = useStyles();
  const coordinates = { lat: 50.827847, lng: 12.921370 };
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const mapId = import.meta.env.VITE_MAP_ID;

  const mapOptions = {
    mapTypeControl: false,  // Disable Map/Satellite control
  };
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [places, setPlaces] = useState([]);

  const [newSidebarContent, setNewSidebarContent] = useState(null);

  const [selectedPin, setSelectedPin] = useState(null);


  const fetchPlaces = async (category) => {
    setSelectedCategory(category.id);
    const res = await api.get(routes[category.urlName]);
    console.log(res.data);
    setPlaces(res.data);
    setIsSidebarOpen(true);
    setNewSidebarContent(null); // Reset new sidebar content
  };

  const handleDirectionsClick = async (place) => {
    try {
      // Fetch new content (example endpoint)
      // const res = await api.get(`/api/directions/${place.ID}`);
      // setNewSidebarContent(res.data); // Set new sidebar content
      setNewSidebarContent([
        {
            "id": 7,
            "house_no": "123",
            "street_name": "Main St",
            "postalcode": "12345",
            "city": "Anytown",
            "state": "Anystate",
            "country": "Anycountry",
            "latitude": 40.7128,
            "longitude": -74.006,
            "user": 5
        }
    ])
    } catch (error) {
      console.error('Error fetching directions:', error);
    }
  };

  const renderNewSidebarContent = () => {
    if (!newSidebarContent) return null;
    return (
      <List className={classes.scrollbar}>
        {/* Render the new sidebar content here */}
        <Typography variant="body2">{JSON.stringify(newSidebarContent)}</Typography>
      </List>
    );
  };


  const renderPlacesList = () => {
    return (
      <List className={classes.scrollbar}>
        {places.map((place, index) => (
          <>
            <ListItem key={index}>
              <ListItemButton>
                <ListItemText
                  primary={place?.BEZEICHNUNG}
                  secondary={
                    <React.Fragment>
                      <Typography component={'span'} variant="body2" color="text.primary" > {place?.ART} </Typography><br />
                      <Typography component={'span'} variant="body2" color="text.secondary" > {place?.STRASSE} </Typography><br />
                      <Typography component={'span'} variant="body2" color="text.secondary" > {place?.TELEFON} </Typography><br />
                    </React.Fragment>
                  }
                />
              </ListItemButton>
              <Tooltip>
                <DirectionsRoundedIcon
                  onClick={() => handleDirectionsClick(place)}
                  style={{ cursor: 'pointer' }}
                />
              </Tooltip>
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    )
  };

  const getPinStyle = (category) => {
    switch (category) {
      case 'schools':
        return { background: "red", borderColor: "black", glyphColor: "white" };
      case 'kindergarden':
        return { background: "blue", borderColor: "black", glyphColor: "white" };
      case 'socialChildProjects':
        return { background: "green", borderColor: "black", glyphColor: "white" };
      case 'socialTeenagerProjects':
        return { background: "purple", borderColor: "black", glyphColor: "white" };
      default:
        return { background: "grey", borderColor: "green", glyphColor: "purple" };
    }
  };

  const handlePinClick = (place) => {
    setSelectedPin(place); // Update selected pin's data
  };

  const renderPlaceDetails = (place) => {
    
  }


  return (
    <APIProvider apiKey={googleMapsApiKey}>
      <Box className={classes.root}>
        <Box className={`${classes.sidebar} ${isSidebarOpen ? classes.sidebarOpen : ''}`}>
          <Box className={classes.drawerHeader}>
            <Typography variant="h6">{newSidebarContent ? 'Select Address' : 'Social Teenager Projects'}</Typography>
            <IconButton onClick={() => setIsSidebarOpen(false)} className={classes.closeButton}>
              <CloseIcon />
            </IconButton>
          </Box>
          {newSidebarContent ? renderNewSidebarContent() : renderPlacesList()}
        </Box>
        <Box className={classes.mapContainer}>
          <Box className={classes.buttonContainer}>
            {categories.map((category) => (
              <Button variant="contained" onClick={() => fetchPlaces(category)}>{category.displayname}</Button>
            ))}
          </Box>
          <Map defaultZoom={12} defaultCenter={coordinates} mapId={mapId} options={mapOptions}>
            {places.map((place, index) => {
              const pinStyle = getPinStyle(selectedCategory); // Assuming each place has a category property
              return (
                <AdvancedMarker position={{ lat: place.Y, lng: place.X }} key={index} onClick={() => handlePinClick(place)}>
                  <Pin background={pinStyle.background} borderColor={pinStyle.borderColor} glyphColor={pinStyle.glyphColor} />
                </AdvancedMarker>
              );
            })}
          </Map>
          {selectedPin && renderPlaceDetails()} {/* Render sidebar if a pin is selected */}
        </Box>
      </Box>
    </APIProvider>
  )
}

export default Maps