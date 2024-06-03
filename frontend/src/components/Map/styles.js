import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100px',
    },
    markerContainer: {
      position: 'absolute', transform: 'translate(-50%, -50%)', zIndex: 1, '&:hover': { zIndex: 2 },
    },
    pointer: {
      cursor: 'pointer',
    },
    root: {
      display: 'flex',
      height: '100vh',
    },
    drawer: {
      width: '25%',
      flexShrink: 0,
    },
    drawerPaper: {
      width: '25%',
      // padding: '10px',
      position: 'relative',
      backgroundColor: `${theme.palette.primary.light} !important`,

    },
    sidebar: {
      width: '0',
      overflowY: 'auto',
      transition: 'width 0.5s ease, opacity 0.5s ease, transform 0.5s ease',
      backgroundColor: `${theme.palette.primary.light} !important`,
      // padding: '10px',
    outline: 'none',
    },
    sidebarOpen: {
      width: '25%',
    },
    mapContainer: {
      flexGrow: 1,
      position: 'relative',
    },
    buttonContainer: {
      position: 'absolute',
      top: '10px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 10,
      display: 'flex',
      flexDirection: 'row',
      gap: '10px',
    },
    list: {
      marginTop: '20px',
    },
    drawerHeader: {
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '10px',
    },
    closeButton: {
      zIndex: 1300, // Ensure it is above the drawer content
    },

    
  }));

  export default useStyles;