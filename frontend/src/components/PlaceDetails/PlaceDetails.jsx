import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Avatar, Box, Card, CardActions, CardContent, CardHeader, Collapse, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Snackbar, Tooltip, Typography, Alert } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import DirectionsRoundedIcon from '@mui/icons-material/DirectionsRounded';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import api, { routes } from '../../api';
import { getResponseError, getResponseInfo } from '../../utils/errorUtils';
import ErrorHandler from '../ErrorHandler/ErrorHandler';
import { generateURL } from '../../general';
import CallIcon from '@mui/icons-material/Call';
import PublicIcon from '@mui/icons-material/Public';
import FaxIcon from '@mui/icons-material/Fax';
import EmailIcon from '@mui/icons-material/Email';
import InfoIcon from '@mui/icons-material/Info';
import LanguageIcon from '@mui/icons-material/Language';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import EditIcon from '@mui/icons-material/Edit';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import DescriptionIcon from '@mui/icons-material/Description';
import SendIcon from '@mui/icons-material/Send';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import useStyles from './styles';



const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


const PlaceDetails = ({ selectedPlace, onClose, favChanged, onDirectionsClick, loading }) => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);


    useEffect(() => {
        setIsFavorite(selectedPlace.is_favorite)
    }, [selectedPlace])

    const userId = localStorage.getItem('user_id');


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const addToFavorite = async () => {
        loading(true);
        try {
            const body = {
                user: Number(userId),
                category: Number(selectedPlace.category),
                item: Number(selectedPlace.ID)
            }
            const response = await api.post(routes.addToFavorite, body);
            const responseInfo = getResponseInfo(response);
            setError(responseInfo);
            setIsFavorite(true);
            favChanged(responseInfo);
        } catch (errorResponse) {
            const errorData = getResponseError(errorResponse);
            setError(errorData);
        } finally {
            loading(false);
        }

    }

    const removeFromFavorite = async () => {
        loading(true);
        try {
            const formData = new FormData();
            formData.append('category', Number(selectedPlace.category));
            formData.append('item', Number(selectedPlace.ID));
            const deleteFavoriteUrl = generateURL(routes.deleteFavorite, { id: userId });
            const response = await api.delete(deleteFavoriteUrl, {
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            const errorData = getResponseInfo(response);
            setError(errorData);
            setIsFavorite(false);
            favChanged(errorData);
        } catch (errorResponse) {
            const errorData = getResponseError(errorResponse);
            setError(errorData);
        } finally {
            loading(false);
        }
    }

    const handleFavoriteClick = () => {
        if (isFavorite) {
            removeFromFavorite();
        } else {
            addToFavorite();
        }
    };

    const handleClickCopy = () => {
        setCopied(true);
        navigator.clipboard.writeText(selectedPlace?.WWW || ''); // Ensure a fallback value in case WWW is missing
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setCopied(false);
    };

    const handleGoToWebsite = () => {
        let url = selectedPlace?.WWW
        if (url) {
            // Check if the URL starts with 'http://' or 'https://'
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                // If not, prepend 'http://'
                url = 'https://' + url;
            }
            console.log(url);
            window.open(url, '_blank');
        }
    };



    const handleDirectionClick = (selectedPlace) => {
        loading(true);
        onDirectionsClick(selectedPlace);
    }

    const handleEmailClick = (email) => {
        window.location.href = `mailto:${email}`;
    };

    const handlePhoneClick = (phone) => {
        window.location.href = `tel:+49${phone}`;
    };


    return (
        <>
            <Box className={classes.placeDetailsCard}>
                <Card className={classes.card} sx={{ maxWidth: 360 }}>
                    <CardHeader
                        action={
                            <IconButton onClick={onClose} className={classes.closeButton}>
                                <CloseIcon />
                            </IconButton>
                        }
                        title={selectedPlace?.DESCRIPTION}
                        titleTypographyProps={{ variant: 'h6', style: { fontSize: '20px' } }}
                        subheader={selectedPlace?.ART}
                    />
                    <Divider />
                    <CardActions disableSpacing>
                        <IconButton aria-label="Directions" onClick={() => { handleDirectionClick(selectedPlace) }}>
                            <Avatar className={classes.avatarStyle}>
                                <DirectionsRoundedIcon />
                            </Avatar>
                        </IconButton>
                        <IconButton onClick={handleFavoriteClick}>
                            {isFavorite ? <FavoriteIcon fontSize='large' style={{ color: 'red' }} /> : <FavoriteBorderIcon fontSize='large' style={{ color: 'red' }} />}
                        </IconButton>
                        <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more" >
                            <Avatar className={classes.expandMore}>
                                <ExpandMoreIcon />
                            </Avatar>
                        </ExpandMore>
                    </CardActions>
                    <Divider />
                    <CardContent sx={{ padding: 0 }}>
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'primary', overflowX: 'hidden' }}>
                            <ListItem className={classes.listItem}>
                                <ListItemAvatar>
                                    <Avatar className={classes.listAvatar}>
                                        <LocationOnOutlinedIcon fontSize='large' />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`${selectedPlace?.STREET} ${selectedPlace?.POSTCODE} ${selectedPlace?.LOCATION}`}
                                    primaryTypographyProps={{
                                        variant: 'body1',
                                        style: {
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'normal',
                                            wordBreak: 'break-word'
                                        }
                                    }} />
                            </ListItem>
                            {selectedPlace.PHONE &&
                                <ListItem className={classes.listItem}>
                                    <ListItemAvatar>
                                        <Avatar className={classes.listAvatar}>
                                            <CallIcon fontSize='large' />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            Array.isArray(selectedPlace?.PHONE) ? (
                                                selectedPlace.PHONE.map((phone, index) => (
                                                    <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                                                        <div style={{ flex: 1 }}> +49 {phone} </div>
                                                        <Tooltip title="Call Phone Number">
                                                            <IconButton onClick={() => handlePhoneClick(phone)} aria-label="send email" >
                                                                <CallOutlinedIcon className={classes.listAvatar} sx={{ fontSize: 'large' }} />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </div>
                                                ))
                                            ) : (
                                                selectedPlace?.PHONE
                                            )
                                        }
                                        primaryTypographyProps={{
                                            variant: 'body1',
                                            style: {
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'normal',
                                                wordBreak: 'break-word'
                                            }
                                        }}
                                    />
                                </ListItem>
                            }

                        </List>
                    </CardContent>

                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent sx={{ overflowY: 'auto', maxHeight: 'calc(100vh - 77vh)', padding: 0 }} className={classes.scrollbar}>

                            {selectedPlace.WWW &&
                                <ListItem className={classes.listItem}>
                                    <ListItemAvatar>
                                        <Avatar className={classes.listAvatar}>
                                            <PublicIcon fontSize='large' />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={<Tooltip title="Go to website">
                                            <Typography className={classes.websiteLink} onClick={handleGoToWebsite} >
                                                {selectedPlace?.WWW}
                                            </Typography>
                                        </Tooltip>}
                                        primaryTypographyProps={{
                                            variant: 'body1',
                                            style: {
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'normal',
                                                wordBreak: 'break-word'
                                            }
                                        }} />
                                    <Tooltip title="Copy URL">
                                        <IconButton onClick={handleClickCopy} aria-label="copy">
                                            <ContentCopyIcon sx={{ fontSize: 'large' }} />
                                        </IconButton>
                                    </Tooltip>
                                </ListItem>
                            }


                            {selectedPlace.FAX &&
                                <Tooltip title="Fax">
                                    <ListItem className={classes.listItem}>
                                        <ListItemAvatar>
                                            <Avatar className={classes.listAvatar}>
                                                <FaxIcon fontSize='large' />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={selectedPlace?.FAX}
                                            primaryTypographyProps={{
                                                variant: 'body1',
                                                style: {
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'normal',
                                                    wordBreak: 'break-word'
                                                }
                                            }} />
                                    </ListItem>
                                </Tooltip>
                            }

                            {selectedPlace.EMAIL &&
                                <ListItem className={classes.listItem}>
                                    <ListItemAvatar>
                                        <Avatar className={classes.listAvatar}>
                                            <EmailIcon fontSize='large' />
                                        </Avatar>
                                    </ListItemAvatar>
                                    {/* <Link href={`mailto:${selectedPlace?.EMAIL}`} underline="none"> */}
                                    <ListItemText
                                        primary={<Tooltip title="Copy to clipboard">
                                            <Typography className={classes.websiteLink} onClick={handleClickCopy} >
                                                {selectedPlace?.EMAIL}
                                            </Typography>
                                        </Tooltip>}
                                        primaryTypographyProps={{
                                            variant: 'body1',
                                            style: {
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'normal',
                                                wordBreak: 'break-word'
                                            }
                                        }} />
                                    {/* </Link> */}
                                    <Tooltip title="Send Email">
                                        <IconButton className={classes.listAvatar} sx={{ marginLeft: 'auto' }} onClick={() => { handleEmailClick(selectedPlace?.EMAIL) }} aria-label="send email" size='small' >
                                            <SendIcon />
                                        </IconButton>
                                    </Tooltip>
                                </ListItem>
                            }

                            {selectedPlace.PROFILE &&
                                <Tooltip title="Profile">
                                    <ListItem className={classes.listItem}>
                                        <ListItemAvatar>
                                            <Avatar className={classes.listAvatar}>
                                                <InfoIcon fontSize='large' />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={selectedPlace?.PROFILE}
                                            primaryTypographyProps={{
                                                variant: 'body1',
                                                style: {
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'normal',
                                                    wordBreak: 'break-word'
                                                }
                                            }} />
                                    </ListItem>
                                </Tooltip>
                            }

                            {selectedPlace.LANGUAGES &&
                                <Tooltip title="Languages">
                                    <ListItem className={classes.listItem}>
                                        <ListItemAvatar>
                                            <Avatar className={classes.listAvatar}>
                                                <LanguageIcon fontSize='large' title="Languages" />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={selectedPlace?.LANGUAGES}
                                            primaryTypographyProps={{
                                                variant: 'body1',
                                                style: {
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'normal',
                                                    wordBreak: 'break-word'
                                                }
                                            }} />
                                    </ListItem>
                                </Tooltip>
                            }

                            {selectedPlace.TRAEGER &&
                                <Tooltip title="Traeger">
                                    <ListItem className={classes.listItem}>
                                        <ListItemAvatar>
                                            <Avatar className={classes.listAvatar}>
                                                <VolunteerActivismIcon fontSize='large' title="Traeger" />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={selectedPlace?.TRAEGER}
                                            primaryTypographyProps={{
                                                variant: 'body1',
                                                style: {
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'normal',
                                                    wordBreak: 'break-word'
                                                }
                                            }} />
                                    </ListItem>
                                </Tooltip>
                            }

                            {selectedPlace.DESCRIPTION_ADDITION &&
                                <Tooltip title="Additional Description">
                                    <ListItem className={classes.listItem}>
                                        <ListItemAvatar>
                                            <Avatar className={classes.listAvatar}>
                                                <DescriptionIcon fontSize='large' />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={selectedPlace?.DESCRIPTION_ADDITION}
                                            primaryTypographyProps={{
                                                variant: 'body1',
                                                style: {
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'normal',
                                                    wordBreak: 'break-word'
                                                }
                                            }} />
                                    </ListItem>
                                </Tooltip>
                            }

                            {selectedPlace.Editor &&
                                <Tooltip title="Editor">
                                    <ListItem className={classes.listItem}>
                                        <ListItemAvatar>
                                            <Avatar className={classes.listAvatar}>
                                                <EditIcon fontSize='large' title="Editor" />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={selectedPlace?.Editor}
                                            primaryTypographyProps={{
                                                variant: 'body1',
                                                style: {
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'normal',
                                                    wordBreak: 'break-word'
                                                }
                                            }} />
                                    </ListItem>
                                </Tooltip>
                            }

                            {selectedPlace.EditDate &&
                                <Tooltip title="Edit Date">
                                    <ListItem className={classes.listItem}>
                                        <ListItemAvatar>
                                            <Avatar className={classes.listAvatar}>
                                                <EditCalendarIcon fontSize='large' />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={selectedPlace?.EditDate}
                                            primaryTypographyProps={{
                                                variant: 'body1',
                                                style: {
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'normal',
                                                    wordBreak: 'break-word'
                                                }
                                            }} />
                                    </ListItem>
                                </Tooltip>
                            }


                        </CardContent>

                        <Snackbar open={copied} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} >
                            <Alert onClose={handleClose} variant="filled" severity="success" color="info">
                                Copied to clipboard
                            </Alert>
                        </Snackbar>
                    </Collapse>
                </Card>
            </Box>
            {error && <ErrorHandler error={error} onClose={() => { setError(null) }} />}

        </>
    );
}

export default PlaceDetails