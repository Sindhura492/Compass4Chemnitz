import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Avatar, Box, Card, CardActions, CardContent, CardHeader, Collapse, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
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


const PlaceDetails = ({ selectedPlace, onClose, favChanged, onDirectionsClick, loading  }) => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [isFavourite, setIsFavourite] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        setIsFavourite(selectedPlace.is_favourite)
    }, [selectedPlace])

    const userId = localStorage.getItem('user_id');


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const addToFavourite = async () => {
        loading(true);
        try {
            const body = {
                user: Number(userId),
                category: Number(selectedPlace.category),
                item: Number(selectedPlace.ID)
            }
            const response = await api.post(routes.addToFavourite, body);
            const responseInfo = getResponseInfo(response);
            setError(responseInfo);
            setIsFavourite(true);
            favChanged(responseInfo);
        } catch (errorResponse) {
            const errorData = getResponseError(errorResponse);
            setError(errorData);
        } finally {
            loading(false);
        }

    }

    const removeFromFavourite = async () => {
        loading(true);
        try {
            const formData = new FormData();
            formData.append('category', Number(selectedPlace.category));
            formData.append('item', Number(selectedPlace.ID));
            const deleteFavouriteUrl = generateURL(routes.deleteFavourite, { id: userId });
            const response = await api.delete(deleteFavouriteUrl, {
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            const errorData = getResponseInfo(response);
            setError(errorData);
            setIsFavourite(false);
            favChanged(errorData);
        } catch (errorResponse) {
            const errorData = getResponseError(errorResponse);
            setError(errorData);
        } finally {
            loading(false);
        }
    }

    const handleFavouriteClick = () => {
        if (isFavourite) {
          removeFromFavourite();
        } else {
          addToFavourite();
        }
      };

    const handleDirectionClick = (selectedPlace) => {
        loading(true);
        onDirectionsClick(selectedPlace);
    }


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
                        <IconButton aria-label="Directions">
                            <Avatar className={classes.avatarStyle}>
                                <DirectionsRoundedIcon onClick={() => {handleDirectionClick(selectedPlace)} } />
                            </Avatar>
                        </IconButton>
                        <IconButton onClick={handleFavouriteClick}>
                            {isFavourite ? <FavoriteIcon fontSize='large' style={{color: 'red'}}/> : <FavoriteBorderIcon fontSize='large' style={{color: 'red'}}/>}
                        </IconButton>
                        <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more" >
                            <Avatar>
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
                            {selectedPlace.PHONE && <ListItem className={classes.listItem}>
                                <ListItemAvatar>
                                    <Avatar className={classes.listAvatar}>
                                        <CallIcon fontSize='large' />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={selectedPlace?.PHONE}
                                    primaryTypographyProps={{
                                        variant: 'body1',
                                        style: {
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'normal',
                                            wordBreak: 'break-word'
                                        }
                                    }} />
                            </ListItem>}

                        </List>
                    </CardContent>

                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent sx={{ overflowY: 'auto', maxHeight: 'calc(100vh - 77vh)', padding: 0 }}>

                            {selectedPlace.WWW && <ListItem className={classes.listItem}>
                                <ListItemAvatar>
                                    <Avatar className={classes.listAvatar}>
                                        <PublicIcon fontSize='large' />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={selectedPlace?.WWW}
                                    primaryTypographyProps={{
                                        variant: 'body1',
                                        style: {
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'normal',
                                            wordBreak: 'break-word'
                                        }
                                    }} />
                            </ListItem>}


                            {selectedPlace.FAX && <ListItem className={classes.listItem}>
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
                            </ListItem>}

                            {selectedPlace.EMAIL && <ListItem className={classes.listItem}>
                                <ListItemAvatar>
                                    <Avatar className={classes.listAvatar}>
                                        <EmailIcon fontSize='large' />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={selectedPlace?.EMAIL}
                                    primaryTypographyProps={{
                                        variant: 'body1',
                                        style: {
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'normal',
                                            wordBreak: 'break-word'
                                        }
                                    }} />
                            </ListItem>}

                            {selectedPlace.PROFILE && <ListItem className={classes.listItem}>
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
                            </ListItem>}

                            {selectedPlace.LANGUAGES && <ListItem className={classes.listItem}>
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
                            </ListItem>}

                            {selectedPlace.TRAEGER && <ListItem className={classes.listItem}>
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
                            </ListItem>}

                            {selectedPlace.DESCRIPTION_ADDITION && <ListItem className={classes.listItem}>
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
                            </ListItem>}

                            {selectedPlace.Editor && <ListItem className={classes.listItem}>
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
                            </ListItem>}

                            {selectedPlace.EditDate && <ListItem className={classes.listItem}>
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
                            </ListItem>}


                        </CardContent>
                    </Collapse>
                </Card>
            </Box>
            {error && <ErrorHandler error={error} onClose={() => { setError(null) }} />}

        </>
    );
}

export default PlaceDetails