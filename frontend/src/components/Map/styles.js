import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100px',
    },
    mapContainer: {
      height: '100vh', 
      width: '100%',
    },
    markerContainer: {
      position: 'absolute', transform: 'translate(-50%, -50%)', zIndex: 1, '&:hover': { zIndex: 2 },
    },
    pointer: {
      cursor: 'pointer',
    },
    centerButton: {
      position: 'absolute',
      top: '12%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: '1000'
    },
    
  }));

  export default useStyles;