import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    sidebar: {
        width: '0',
        overflowY: 'auto',
        transition: 'width 0.5s ease, opacity 0.5s ease, transform 0.5s ease',
        backgroundColor: `${theme.palette.primary.light} !important`,
        outline: 'none',
      },
      drawerHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px 0 0 20px',
        alignItems: 'center',
      },
}))

export default useStyles;