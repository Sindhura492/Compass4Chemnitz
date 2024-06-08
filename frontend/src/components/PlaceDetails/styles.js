import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    placeDetailsCard: {
        display: 'flex',
        flexWrap: 'wrap',
        position: 'absolute',
        top: 85,
        left: 15, // Positioned beside the sidebar
        width: '25%', // Fixed width for the card
        // backgroundColor: `${theme.palette.primary.light} !important`,
        maxWidth: '25%',
        [theme.breakpoints.down('sm')]: {
          left: 0,
          width: '100%',
        },
        zIndex: 1000,
      },
      card: {
        backgroundColor: `${theme.palette.primary.light} !important`,
      },
      avatarStyle: { 
        backgroundColor: '#2196f3 !important',
      },
      listItem: {
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        display: 'flex',
        justifyContent: 'space-between',
        padding: '16px',

        
      },
      listAvatar: {
        backgroundColor: 'transparent !important',
        border: 'none',
        color: '#1a73e8 !important',
        padding: 0,
      }

    }

))

export default useStyles;