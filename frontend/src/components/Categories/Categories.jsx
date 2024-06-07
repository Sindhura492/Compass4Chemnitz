// src/components/Categories.js
import React, { useEffect, useState } from 'react';
import { Box, IconButton, List, ListItem, ListItemButton, ListItemText, Typography, Divider, Tooltip, Avatar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DirectionsRoundedIcon from '@mui/icons-material/DirectionsRounded';
import useStyles from './styles';
import api, { routes } from '../../api';
import Loader from '../Loader/Loader';
import ErrorHandler from '../ErrorHandler/ErrorHandler';
import { getResponseError } from '../../utils/errorUtils';

const Categories = ({ selectedCategory, onClose, onPlaceSelect, markPlaces, loading, error }) => {
  const classes = useStyles();

  const [places, setPlaces] = useState([]);
  const [open, setOpen] = useState(false);


  useEffect(() => {
    const fetchPlaces = async () => {
      loading(true)
      try {
        const res = await api.get(routes[selectedCategory.urlName]);
        setPlaces(res.data);
        markPlaces(res.data)
        setOpen(true)
      } catch(error) {
        const errorData = getResponseError(error);
        error(errorData);
      } finally {
        loading(false)
      }
    };
    if (selectedCategory) {
      console.log(selectedCategory, "in if");
      fetchPlaces();
    }
  }, [selectedCategory]);

  const handleCloseSidebar = () => {
    // setSelectedCategory('');
    setOpen(false);
  };

  console.log("selectedCategory", selectedCategory);

  


  return (

    <Box className={`${classes.sidebar} ${open ? classes.sidebarOpen : ''}`}>
      <Box className={classes.drawerHeader}>
        <Typography variant="h6">{selectedCategory.displayname}</Typography>
        <IconButton onClick={handleCloseSidebar} className={classes.closeButton}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List className={classes.scrollbar}>
        {places.map((place, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemButton onClick={() => onPlaceSelect(place)}>
                <ListItemText
                  primary={place?.BEZEICHNUNG}
                  secondary={
                    <>
                      <Typography component={'span'} variant="body2" color="text.primary">{place?.ART}</Typography><br />
                      <Typography component={'span'} variant="body2" color="text.secondary">{place?.STRASSE}</Typography><br />
                      <Typography component={'span'} variant="body2" color="text.secondary">{place?.TELEFON}</Typography><br />
                    </>
                  }
                />
              </ListItemButton>
              <Tooltip title="Get Directions">
              <Avatar sx={{ bgcolor: '#2196f3' }}>
                <DirectionsRoundedIcon style={{ cursor: 'pointer' }} />
              </Avatar>
              </Tooltip>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>

  );
};

export default Categories;
