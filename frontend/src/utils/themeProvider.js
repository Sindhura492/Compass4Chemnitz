import { createTheme, colors } from '@mui/material';

export const theme = createTheme({
    palette: {
      primary: {
        main: colors.orange[300],
        light: colors.orange[50]
      },
      secondary: {
        main: colors.amber[200]
      }
    }
  });