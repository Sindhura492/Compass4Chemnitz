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
        overflow: 'hidden', 
        zIndex: -1,
      },
    avatarStyle: { 
        backgroundColor: `${theme.palette.primary.main} !important`,
    },
    paperStyle: {
        width: '40vw',
        position: 'relative',
        left: '10%',
        padding: '20px',
        backgroundColor: `${theme.palette.secondary.light} !important`,
    },
    m8: { 
        margin: '8px 0 !important',
    }
}));

export default useStyles;


// backgroundColor: '#ff6628' ,
// backgroundColor: '#f4e5d1',
// backgroundColor: '#edc75e',
// backgroundColor: '#ff6628',
// backgroundColor: '#ff5528'




