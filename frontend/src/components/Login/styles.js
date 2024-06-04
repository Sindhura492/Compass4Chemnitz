import { makeStyles } from "@mui/styles";


const useStyles = makeStyles((theme) => ({
    background: {
        position: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundImage: 'url("/LoginBG.JPG")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',   
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
        // overflow: 'hidden', 
        zIndex: -1,
        flexWrap: 'wrap',
      },
    avatarStyle: { 
        backgroundColor: `${theme.palette.primary.main} !important`,
    },
    paperStyle: {
        // width: '40vw',
        position: 'relative',
        left: '10%',
        padding: '20px',
        backgroundColor: `${theme.palette.secondary.light} !important`,
    },
    scrollbar: {
        padding: '5px',
        '&::-webkit-scrollbar': {
          width: '5px', /* Adjust width as desired */
        },
        '&::-webkit-scrollbar-track': {
          background: theme.palette.secondary.dark, /* Light gray background for track */
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: theme.palette.primary.main, /* Gray color for thumb */
          borderRadius: '5px', /* Rounded corners for thumb */
        },
      },
      
    m8: { 
        margin: '6px 0 !important',
    }
}));

export default useStyles;


// backgroundColor: '#ff6628' ,
// backgroundColor: '#f4e5d1',
// backgroundColor: '#edc75e',
// backgroundColor: '#ff6628',
// backgroundColor: '#ff5528'




