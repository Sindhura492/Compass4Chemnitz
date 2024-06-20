// import GoogleMapReact from 'google-map-react';
// "use client";
import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import { APIProvider, AdvancedMarker, Map, Pin } from '@vis.gl/react-google-maps';
import { categories } from '../../constants';
import Categories from '../Categories/Categories';
import PlaceDetails from '../PlaceDetails/PlaceDetails';
import Directions from '../Directions/Directions';
import book from '../../assets/open-book.png';
import littleKid from '../../assets/little-kid.png';
import playtime from '../../assets/playtime.png';
import learning from '../../assets/learning.png';

import useStyles from './styles';


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
  const [selectedPin, setSelectedPin] = useState(null);
  const [showCategories, setShowCategories] = useState(false);
  const [showPlaceDetails, setPlaceDetails] = useState(false);
  const [showDirections, setShowDirections] = useState(false);

  const [favChanged, setFavChanged] = useState(null);

  const [destination, setDestination] = useState(null);

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
        return { background: "#cad74d", borderColor: "#98a51b", icon: book };
      // return { background: "#FFA62F", borderColor: "#D77E07", icon: book };
      case 'kindergarten':
        return { background: "#50C2FF", borderColor: "#0054C3", icon: littleKid };
      // return { background: "#FFA456", borderColor: "#F55E10", icon: book };
      case 'socialChildProjects':
        return { background: "#13dfac", borderColor: "#00ad7a", icon: playtime };
      case 'socialTeenagerProjects':
        return { background: "#f44a8d", borderColor: "#c2185b", icon: learning };
      default:
        return { background: "grey", borderColor: "green", icon: book };
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

  const handleFavorite = (value) => {
    setFavChanged(value)
  }

  const handleDirectionsClick = (place) => {
    loading(true)
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
          error={error} /> : selectedCategory ? (
            <Categories
              selectedCategory={selectedCategory}
              onClose={handleCategoriesCloseSidebar}
              onPlaceSelect={handlePinClick}
              markPlaces={showPlaces}
              loading={loading}
              error={error}
              selectedPlace={selectedPin}
              favChanged={favChanged}
              handleFavChange={handleFavorite}
            />
          ) : null}
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

                  {/* <Pin>
                    {selectedPin?.ID === place.ID && (
                      <div style={{ backgroundColor: 'transparent', borderRadius: '90%' }}>
                        <img
                          src={pinStyle.icon}
                          alt="Marker Image"
                          height="15px"
                          width="15px"
                        />
                      </div>
                    )}
                  </Pin> */}

                  {selectedPin?.ID === place.ID && <Pin><img
                    src={pinStyle.icon}
                    alt="Marker Image"
                    height="15px"
                    width="15px"
                  /></Pin>}

                  {selectedPin?.ID != place.ID && <Pin background={pinStyle.background} borderColor={pinStyle.borderColor}><img
                    src={pinStyle.icon}
                    alt="Marker Image"
                    height="18px"
                    width="18px"
                  /></Pin>}

                  {/* {selectedPin?.ID != place.ID && <Pin background={pinStyle.background} borderColor={pinStyle.borderColor} glyphColor={pinStyle.glyphColor} />} */}
                </AdvancedMarker>
              );

            })}
          </Map>

          {showPlaceDetails && (<PlaceDetails onClose={handlePlaceCardClose} selectedPlace={selectedPin} favChanged={handleFavorite} onDirectionsClick={handleDirectionsClick} loading={loading} />)}

        </Box>
      </Box>
    </APIProvider>
  )
}

export default Maps