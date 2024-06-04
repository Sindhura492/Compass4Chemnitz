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
  drawerHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0 0 20px',
    alignItems: 'center',
  },
  closeButton: {
    zIndex: 1300, // Ensure it is above the drawer content
  },
  scrollbar: {
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-track': {
      background: '#f1f1f1',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#888',
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#555',
    },
  },


}));

export default useStyles;