import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    sidebar: {
        width: '0',
        // overflowY: 'auto',
        transition: 'width 0.5s ease, opacity 0.5s ease, transform 0.5s ease',
        backgroundColor: `${theme.palette.primary.light} !important`,
        outline: 'none'
      },
      sidebarOpen: {
        width: '25%',
        [theme.breakpoints.down('sm')]: {
          width: '100%', // Full width on small screens
          flexDirection: 'column',
        },
      },
      drawerHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '16px 0 0 16px',
        boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.1)',
        // position: 'fixed',
        backgroundColor: `${theme.palette.secondary.light} !important`,
      },
      closeButton: {
        color: 'inherit',
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
      
}))

export default useStyles;