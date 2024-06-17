// import GoogleMapReact from 'google-map-react';
// "use client";
import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import { Box, Button, Icon } from '@mui/material';
import { APIProvider, AdvancedMarker, Map, Pin } from '@vis.gl/react-google-maps';
import { categories } from '../../constants';
import Categories from '../Categories/Categories';
import PlaceDetails from '../PlaceDetails/PlaceDetails';
import Directions from '../Directions/Directions';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';


const Maps = ({ loading, error }) => {
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
  const [showCategories, setShowCategories] = useState(false);
  const [showPlaceDetails, setPlaceDetails] = useState(false);
  const [showDirections, setShowDirections] = useState(false);

  const [favChanged, setFavChanged] = useState(null);

  const [origin, setOrigin] = useState(coordinates);
  const [destination, setDestination] = useState(null);
  const [showButton, setShowButtons] = useState(true);

  const handleCategoryClick = (category) => {
    if (selectedCategory != category) {
      setListOfPlaces(null);
    }
    setSelectedPin(null); // Update selected pin's data
    setPlaceDetails(false);
    setSelectedCategory(category);
    setShowDirections(false);
    setShowCategories(true);
  };

  const handleCategoriesCloseSidebar = () => {
    setShowCategories(false);
  };

  const handlePlaceSelect = (place) => {
    setPlaces([place]);
    handlePinClick(place);
  };

  const showPlaces = (listOfPlaces) => {
    setListOfPlaces(listOfPlaces);
  }

  const getPinStyle = (category) => {
    switch (category) {
      case 'schools':
        return { background: "#704264", borderColor: "#BB8493", glyphColor: "#DBAFA0" };
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
    setPlaceDetails(true);
  };

  const handlePlaceCardClose = () => {
    setSelectedPin(null);
    setPlaceDetails(false);
  };

  const handleFavourite = (value) => {
    setFavChanged(value)
  }

  const handleDirectionsClick = (place) => {
    setListOfPlaces([]);
    setPlaceDetails(false)
    setShowCategories(false);
    setShowDirections(true);
    setDestination({ lat: place.Y, lng: place.X });
    // setSelectedPin(null); // Close PlaceDetails
  };

  const handleCloseDirections = () => {
    setShowDirections(false);
    setDestination(null);
    setShowCategories(true);
    setPlaceDetails(true);
  };

  return (

    <APIProvider apiKey={googleMapsApiKey}>
      <Box className={classes.map}>
        {showDirections ? <Directions destination={destination} onClose={handleCloseDirections} loading={loading}
            error={error}/> : selectedCategory ? (
          <Categories
            selectedCategory={selectedCategory}
            onClose={handleCategoriesCloseSidebar}
            onPlaceSelect={handlePinClick}
            markPlaces={showPlaces}
            loading={loading}
            error={error}
            selectedPlace={selectedPin}
            favChanged={favChanged}
            handleFavChange={handleFavourite}
          />
        ): null}
        <Box className={classes.mapContainer}>
          {!showDirections && (<Box className={classes.buttonContainer}>
            {categories.map((category) => (
              <Button variant="contained" onClick={() => handleCategoryClick(category)} key={category.id} className={selectedCategory === category ? classes.selectedButton : ''}>{category.displayname}</Button>
            ))}
          </Box>)}
          <Map defaultZoom={12} defaultCenter={coordinates} mapId={mapId} options={mapOptions}>
            {listOfPlaces && listOfPlaces.map((place, index) => {
              const pinStyle = getPinStyle(selectedCategory.id);
              return (
                <AdvancedMarker position={{ lat: place.Y, lng: place.X }} key={index} onClick={() => handlePinClick(place)}>
                  {selectedPin?.ID === place.ID && <Pin background="transparent"borderColor="transparent"><AccountBalanceIcon/></Pin>}
                  {selectedPin?.ID != place.ID && <Pin background={pinStyle.background} borderColor={pinStyle.borderColor} glyphColor={pinStyle.glyphColor} />}
                </AdvancedMarker>
              );

            })}
          </Map>

          {showPlaceDetails && (<PlaceDetails onClose={handlePlaceCardClose} selectedPlace={selectedPin} favChanged={handleFavourite} onDirectionsClick={handleDirectionsClick} />)}

        </Box>
      </Box>
    </APIProvider>
  )
}

export default Maps