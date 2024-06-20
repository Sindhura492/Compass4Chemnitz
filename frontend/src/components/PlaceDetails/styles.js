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
      },
      websiteLink: {
        cursor: 'pointer', // Change cursor to pointer on hover
        textDecoration: 'none', // Remove default underline
        '&:hover': { // Underline on hover
          textDecoration: 'underline',
        },
      },
      scrollbar: {
        overflowY: 'auto', // Adjust based on the height of the drawerHeader
        height: 'calc(100vh - 17vh)', // Adjust based on the height of the drawerHeader
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

      expandMore: {
        backgroundColor: `${theme.palette.primary.main} !important`,
        border: '1px solid #E1992F'
      },

    }

))

export default useStyles;