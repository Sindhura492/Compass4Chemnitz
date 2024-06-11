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
  switchBox: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    position: 'relative',
    width: '100%',
  },
  switchIconPosition: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '12px'
  },

}));

export default useStyles;