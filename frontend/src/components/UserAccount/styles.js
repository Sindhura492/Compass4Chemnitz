import { colors } from "@mui/material";
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
      },
      drawer: {
        width: 240,
        flexShrink: 0,
      },
      drawerPaper: {
        width: 240,
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
      },
      avatar: {
        backgroundColor: colors.deepOrange[500],
      },

}));

export default useStyles;