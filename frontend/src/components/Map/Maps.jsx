// import GoogleMapReact from 'google-map-react';
"use client";
import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import { Box, Button, ButtonGroup, Drawer, IconButton, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import { APIProvider, AdvancedMarker, Map, Pin } from '@vis.gl/react-google-maps';
import CloseIcon from '@mui/icons-material/Close';
import { categories } from '../../constants';
import api, { routes } from '../../api';

const Maps = () => {
  const classes = useStyles();
  const coordinates = { lat: 50.827847, lng: 12.921370 };
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
  const [places, setPlaces] = useState([]);

  const fetchPlaces = async (category) => {
    setSelectedCategory(category.id);
    const res=await api.get(routes[category.urlName]);
    console.log(res.data);
    setPlaces(res.data);
    setIsSidebarOpen(true);
  };

  const fetchSchools = (data) => {
  }

  const renderPlacesList = () => {
    console.log("hihihih");
    if(places){
      places.map((place) => {
      console.log("ssss", place.X, place.Y);
    })
  }
  console.log("Byyeee");
    return (
      <List className={classes.list}>
        {places.map((place, index) => (
          <ListItem key={index}>
            <ListItemText primary={place?.PLZ} secondary={place?.TELEFON} />
          </ListItem>
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
            {categories.map((category) => (
              <Button variant="contained" onClick={() => fetchPlaces(category)}>{category.displayname}</Button>
            ))}
          </Box>
          <Map defaultZoom={12} defaultCenter={coordinates} mapId={mapId} options={mapOptions}>
            {places.map((place) => {
              const pinStyle = getPinStyle(selectedCategory); // Assuming each place has a category property
              return (
                <AdvancedMarker position={{ lat: place.Y, lng: place.X }} key={place.ID}>
                  <Pin background={pinStyle.background} borderColor={pinStyle.borderColor} glyphColor={pinStyle.glyphColor} />
                </AdvancedMarker>
              );
            })}
          </Map>
        </Box>
      </Box>
    </APIProvider>
  )
}

export default Maps