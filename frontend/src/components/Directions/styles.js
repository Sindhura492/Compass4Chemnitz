import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  sidebar: {
    height: 'inherit',
    position: 'absolute',
    right: 0,
    // top: 0,
    transition: 'transform 0.3s ease-in-out',
    transform: 'translateX(100%)', // Sidebar hidden by default
    zIndex: 1200,
    transition: 'width 0.5s ease, opacity 0.5s ease, transform 0.5s ease',
    backgroundColor: `${theme.palette.primary.light} !important`,
    // maxWidth: '20%',
  },
  sidebarOpen: {
    width: '20%',
    transform: 'translateX(0)', // Show sidebar
    [theme.breakpoints.down('sm')]: {
      width: '100%', // Full width on small screens
      flexDirection: 'column',
    },
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '16px 0 0 16px',
    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.1)',
    justifyContent: 'space-between',
    backgroundColor: `${theme.palette.secondary.light} !important`,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  scrollbar: {
    overflowY: 'auto',
    maxHeight: 'calc(100% - 64px)', // Adjust based on header height
    '&::-webkit-scrollbar': {
      width: '0.4em',
    },
    '&::-webkit-scrollbar-track': {
      background: '#f1f1f1',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#888',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#555',
    },
  },
  closeButton: {
    color: theme.palette.text.secondary,
  },
  directionsInfo: {
    padding: theme.spacing(2),
  },
  routeOption: {
    padding: theme.spacing(1),
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  tabs: {
    flexGrow: 1,
    flexShrink: 1,
    width: '100%',
    minWidth: 0, // To prevent overflow
    maxWidth: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    borderBottom: `1px solid ${theme.palette.divider}`,
    '& .MuiTab-root': {
      minWidth: 0, // Remove default min width
      flex: 1, // Ensure tabs take equal space
      [theme.breakpoints.down('xs')]: {
        fontSize: '0.75rem', // Adjust font size for smaller screens
      },
    },
  },
  directionsInfo: {
    padding: theme.spacing(2),
  },
  routeOption: {
    padding: theme.spacing(1),
  },
  selectedItem: {
    backgroundColor: `${theme.palette.primary.main} !important`,
  },

}));

export default useStyles;