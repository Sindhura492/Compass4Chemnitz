// import GoogleMapReact from 'google-map-react';
// "use client";
import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import { Box, Button, ButtonGroup, Card, CardContent, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemButton, ListItemText, Paper, Rating, Tooltip, Typography } from '@mui/material';
import { APIProvider, AdvancedMarker, Map, Pin } from '@vis.gl/react-google-maps';
import CloseIcon from '@mui/icons-material/Close';
import { categories } from '../../constants';
import api, { routes } from '../../api';
import DirectionsRoundedIcon from '@mui/icons-material/DirectionsRounded';
import Categories from '../Categories/Categories';
import PlaceDetails from '../PlaceDetails/PlaceDetails';

const Maps = ({loading, error}) => {
  const classes = useStyles();
  const coordinates = { lat: 50.827847, lng: 12.921370 };
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const mapId = import.meta.env.VITE_MAP_ID;

  const mapOptions = {
    mapTypeControl: false,  // Disable Map/Satellite control
  };
  const [selectedCategory, setSelectedCategory] = useState('');
  const [places, setPlaces] = useState(null);
  const [listOfPlaces, setListOfPlaces] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedPin, setSelectedPin] = useState(null);
  const [cardClose, setCardClose] = useState(false)

  

  const handleCategoryClick = (category) => {
    console.log(category, "category");
    setListOfPlaces(null);
    setSelectedCategory(category);
  };

  const handleCloseSidebar = () => {
    // setSelectedCategory('');
    setOpen(false);
  };

  const handlePlaceSelect = (place) => {
    setPlaces([place]);
  };

  const showPlaces = (listOfPlaces) => {
    setListOfPlaces(listOfPlaces);
  }

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
    console.log(selectedPin, place, "hellooo");
    setCardClose(true);
  };

  const handleCardClose = () => {
    // setSelectedCategory('');
    setCardClose(false);
  };

  const renderPlaceDetails = () => {
    return (
      <>
      {cardClose && <Box className={classes.placeDetailsCard}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {selectedPin?.BEZEICHNUNG}
              <IconButton onClick={handleCardClose} className={classes.closeButton}>
          <CloseIcon />
        </IconButton>

            </Typography>
            <Rating value={2} readOnly precision={0.5} />
            <Typography variant="body2" color="text.secondary">
              {selectedPin?.TELEFON}
            </Typography>
            {/* Add buttons or links for reviews, directions, etc. */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <IconButton aria-label="Reviews">
                {/* Add icon component (e.g., <ReviewsIcon />) */}
              </IconButton>
              <IconButton aria-label="Directions">
                <DirectionsRoundedIcon />
              </IconButton>
            </Box>
            {/* Add buttons for Dine-in, Takeaway, Delivery */}
            <Box sx={{ display: 'flex', mt: 1 }}>
              <IconButton aria-label="Dine-in">
                {/* Add icon component (e.g., <RestaurantIcon />) */}
              </IconButton>
              <IconButton aria-label="Takeaway">
                {/* Add icon component */}
              </IconButton>
              <IconButton aria-label="Delivery">
                {/* Add icon component */}
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      </Box>}
      
      </>
    );
  }

  return (
    
    <APIProvider apiKey={googleMapsApiKey}>
      <Box className={classes.map}>
        {selectedCategory && (
          <Categories
            selectedCategory={selectedCategory}
            onClose={handleCloseSidebar}
            onPlaceSelect={handlePlaceSelect}
            markPlaces = {showPlaces}
            loading={loading}
            error={error}
          />
        )}
        <Box className={classes.mapContainer}>
          <Box className={classes.buttonContainer}>
          {categories.map((category) => (
              <Button variant="contained" onClick={() => handleCategoryClick(category)} key={category.id}>{category.displayname}</Button>
            ))}
            {/* <Button variant="contained" onClick={() => handleCategoryClick('schools')}>Schools</Button>
            <Button variant="contained" onClick={() => handleCategoryClick('kindergarden')}>Kindergarden</Button> */}
          </Box>
          <Map defaultZoom={12} defaultCenter={coordinates} mapId={mapId} options={mapOptions}>
            {listOfPlaces && listOfPlaces.map((place, index) => {
              const pinStyle = getPinStyle(selectedCategory.id);
              return (
                <AdvancedMarker position={{ lat: place.Y, lng: place.X }} key={index} onClick={() => handlePinClick(place)}>
                  <Pin background={pinStyle.background} borderColor={pinStyle.borderColor} glyphColor={pinStyle.glyphColor} />
                </AdvancedMarker>
              );

            })}
          </Map>
          {/* {selectedPin && cardClose && renderPlaceDetails()} */}

          {selectedPin && cardClose && (<PlaceDetails onClose={handleCardClose} selectedPlace={selectedPin}/>)}
        </Box>
      </Box>
    </APIProvider>
  )
}

export default Maps