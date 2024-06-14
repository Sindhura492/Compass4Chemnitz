import React, { useEffect, useState } from 'react';
import { AppBar, Badge, IconButton, Menu, MenuItem, Toolbar, Typography, Box, Avatar } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import GradeIcon from '@mui/icons-material/Grade';

export default function Header({ isSuperUser = false, isLoginPage = true }) {

    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const navigate = useNavigate();
    useEffect(() => {
    }, [isLoginPage, isSuperUser])

    
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const navigateToUserAccount = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
        navigate('/user');
    }

    const navigateToHome = () => {
        navigate('/');
    }

    const naviagteToFavourites = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
        navigate('/favourite');
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu anchorEl={anchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right', }} id={menuId} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right', }} open={isMenuOpen} onClose={handleMenuClose} >
            {/* <MenuItem onClick={handleMenuClose}>Profile</MenuItem> */}
            <MenuItem onClick={navigateToUserAccount}>My Account</MenuItem>
            <MenuItem onClick={handleMenuClose}><Link href="/logout" underline="none" color='inherit'>Logout</Link></MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu anchorEl={mobileMoreAnchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right', }} id={mobileMenuId} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right', }} open={isMobileMenuOpen} onClose={handleMobileMenuClose} >
            <MenuItem>
                <IconButton size="large" color="inherit" onClick={naviagteToFavourites}>
                    <FavoriteIcon />
                </IconButton>
                <p>Favorites</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton size="large" aria-controls="primary-search-account-menu" aria-haspopup="true" color="inherit" >
                    {isSuperUser && (<Badge badgeContent={<GradeIcon fontSize='s' sx={{ width: 16, height: 16, color: '#004d40' }} />} overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }} >
                        <Avatar sx={{ bgcolor: '#f44336', width: 25, height: 25 }}>
                        </Avatar>
                    </Badge>)}
                    {!isSuperUser && (<PersonIcon />)}
                </IconButton>
                <p>My Account</p>
            </MenuItem>
        </Menu>
    );




    // function stringToColor(string) {
    //     let hash = 0;
    //     let i;
    //     for (i = 0; i < string.length; i += 1) {
    //         hash = string.charCodeAt(i) + ((hash << 5) - hash);
    //     }

    //     let color = '#';

    //     for (i = 0; i < 3; i += 1) {
    //         const value = (hash >> (i * 8)) & 0xff;
    //         color += `00${value.toString(16)}`.slice(-2);
    //     }
    //     return color;
    // }

    // function stringAvatar(name, size=30) {
    //     return {
    //         sx: {
    //             bgcolor: stringToColor(name),
    //             width: size, // Set width based on size parameter
    //   height: size, // Set height based on size parameter
    //   fontSize: size / 3, // Adjust font size proportionally to size
    //         },
    //         children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    //     };
    // }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    {/* <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }} >
                        <MenuIcon />
                    </IconButton> */}
                    <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'block', cursor: 'pointer' } }} onClick={navigateToHome} >
                        Compass4Chemnitz
                    </Typography>

                    <Box sx={{ flexGrow: 1 }} />
                    {!isLoginPage && (
                        <>
                            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                <IconButton size="large" aria-label="favourites" color="inherit" onClick={naviagteToFavourites}>
                                    {/* <Badge badgeContent={17} color="error"> */}
                                    <FavoriteIcon />
                                    {/* </Badge> */}
                                </IconButton>
                                <IconButton size="large" edge="end" aria-label="account of current user" aria-controls={menuId} aria-haspopup="true" onClick={handleProfileMenuOpen} color="inherit" >
                                    {isSuperUser && (<Badge badgeContent={<GradeIcon fontSize='s' sx={{ width: 16, height: 16, color: '#004d40' }} />} overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }} >
                                        <Avatar sx={{ bgcolor: '#f44336', width: 25, height: 25 }}>
                                        </Avatar>
                                    </Badge>)}
                                    {!isSuperUser && (<PersonIcon />)}
                                </IconButton>
                            </Box>
                            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                                <IconButton size="large" aria-label="show more" aria-controls={mobileMenuId} aria-haspopup="true" onClick={handleMobileMenuOpen} color="inherit" >
                                    <MenuIcon />
                                </IconButton>
                            </Box>
                        </>
                    )}
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {!isLoginPage && renderMenu}
        </Box>
    );
}
