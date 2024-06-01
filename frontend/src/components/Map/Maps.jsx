// import GoogleMapReact from 'google-map-react';
"use client";
import React from 'react';
import useStyles from './styles';
import { Paper, Typography } from '@mui/material';
import { APIProvider, Map } from '@vis.gl/react-google-maps';

const Maps = () => {
  const classes = useStyles();
  const coordinates = { lat: 61.2176, lng: -149.8997};
  console.log("koko");

  return (
    <APIProvider apiKey={''}>
      <div className={classes.mapContainer}>
        <Map zoom={10} center={coordinates} mapId={''}>
        {/* <Marker position={coordinates} /> */}
        </Map>
      </div>

    </APIProvider>

  )
}

export default Maps