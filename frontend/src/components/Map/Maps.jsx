// import GoogleMapReact from 'google-map-react';
"use client";
import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import { Button, ButtonGroup, Drawer, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import { APIProvider, AdvancedMarker, Map, Pin } from '@vis.gl/react-google-maps';
import Categories from '../Categories/Categories';

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

  // const [mapOptions, setMapOptions] = useState({});

  // useEffect(() => {
  //   if (typeof google !== 'undefined' && google.maps) {
  //     setMapOptions({
  //       zoomControl: true,
  //       zoomControlOptions: {
  //         position: google.maps.ControlPosition.RIGHT_CENTER,
  //       },
  //       scrollwheel: true,
  //       disableDoubleClickZoom: false,
  //     });
  //   }
  // }, []);
  const [activeCategory, setActiveCategory] = useState('restaurants');

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <APIProvider apiKey={googleMapsApiKey}>
      <div className={classes.mapContainer}>
        {/* <ButtonGroup variant="contained" aria-label="outlined primary button group" className={classes.centerButton}>
        <Button onClick={() => setActiveCategory('restaurants')}>Restaurants</Button>
        <Button onClick={() => setActiveCategory('hotels')}>Hotels</Button>
      </ButtonGroup> */}

        <Button onClick={toggleDrawer}>Categories</Button>
        <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
          <List>
            <ListItem button>
              <ListItemText primary="Restaurants" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Hotels" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Things to do" />
            </ListItem>
            {/* Add more categories here */}
          </List>
        </Drawer>



        <Map defaultZoom={10} defaultCenter={coordinates} mapId={mapId}>
          {/* <AdvancedMarker position={coordinates}>
          <Pin background={"grey"} borderColor={"green"} glyphColor={"purple"} />
        </AdvancedMarker> */}
          {trees.map((point) =>
            <AdvancedMarker position={{ lat: point[2], lng: point[3] }} key={point[0]}>
              <Pin background={"grey"} borderColor={"green"} glyphColor={"purple"} />
            </AdvancedMarker>
          )}
        </Map>
      </div>

    </APIProvider>

  )
}

export default Maps