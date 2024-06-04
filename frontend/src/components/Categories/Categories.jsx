import React from 'react';
import { Box, IconButton, Tab, Tabs, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useStyles from './styles';
import { useNavigate } from 'react-router-dom';


const Categories = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Box className={classes.sidebar}>
      <Box className={classes.drawerHeader}>
        <Typography variant="h6">Schools</Typography>
        <IconButton onClick={() => navigate('/')} className={classes.closeButton}>
          <CloseIcon />
        </IconButton>
      </Box>
      {data ? (
        <ul>
          {data.schools.map((school, index) => (
            <li key={index}>{school.name}</li>
          ))}
        </ul>
      ) : (
        <p>No data available</p>
      )}
    </Box>
    
    // <>
    //   <Box className={classes.drawerHeader}>
    //     <Typography variant="h6">{newSidebarContent ? 'Select Address' : 'Social Teenager Projects'}</Typography>
    //     <IconButton onClick={() => setIsSidebarOpen(false)} className={classes.closeButton}>
    //       <CloseIcon />
    //     </IconButton>
    //   </Box>
    //   {newSidebarContent ? renderNewSidebarContent() : renderPlacesList()}
    // </>
  )
}

export default Categories