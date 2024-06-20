import { makeStyles } from "@mui/styles";
import React from 'react';
import logo from '../../assets/destination.png'

const useStyles = makeStyles((theme) => ({
  footer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${theme.palette.primary.main} !important`,
    // position: 'fixed', // Ensure it sticks to the bottom
    bottom: 0,
    left: 0,
    width: '100%',
    zIndex: 9000,
    marginTop: 'auto'
  },
  hide: {
    display: 'none'
  }
}));

const Footer = ({show=false}) => {
  const classes = useStyles();
  return (
    <footer className={show? classes.footer : classes.hide}> Copyright &copy; {new Date().getFullYear()} Compass4Chemnitz</footer>
  );
};

export default Footer