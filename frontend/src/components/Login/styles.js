import {makeStyles} from '@material-ui/core'


export default makeStyles((theme) => ({
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
        backgroundColor: 'red',
    },
    paperStyle: {
        position: 'absolute',
        left: '10%',
        padding: 20,
        backgroundColor: '#f4e5d1',
    },
    btnstyle : { 
        margin: '8px 0',
    }
}));


// backgroundColor: '#ff6628' ,
// backgroundColor: '#f4e5d1',
// backgroundColor: '#edc75e',
// backgroundColor: '#ff6628',
// backgroundColor: '#ff5528'



