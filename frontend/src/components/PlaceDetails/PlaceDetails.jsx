import React, { useEffect, useState } from 'react'
import useStyles from './styles';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Divider, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DirectionsRoundedIcon from '@mui/icons-material/DirectionsRounded';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import PlaceIcon from '@mui/icons-material/Place';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';



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


const PlaceDetails = ({ selectedPlace, onClose }) => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [isFavourite, setIsFavourite] = useState(selectedPlace.is_favourite);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const addToFavourite = () => {

    }

    const removeFromFavourite = () => {

    }


    return (
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
                            <DirectionsRoundedIcon />
                        </Avatar>
                    </IconButton>
                    {!isFavourite && <IconButton aria-label="Favourites" onClick={addToFavourite}>
                        <FavoriteBorderIcon fontSize="large" style={{ color: 'red' }} />
                    </IconButton>}

                    {isFavourite && <IconButton aria-label="Favorites" onClick={removeFromFavourite}>
                        <FavoriteIcon fontSize="large" style={{ color: 'red' }} />
                    </IconButton>}
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
                                    <LocationOnOutlinedIcon fontSize='large' />
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
                                    <LocationOnOutlinedIcon fontSize='large' />
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
                                    <LocationOnOutlinedIcon fontSize='large' />
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
                                    <LocationOnOutlinedIcon fontSize='large' />
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
                                    <LocationOnOutlinedIcon fontSize='large' />
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
                                    <LocationOnOutlinedIcon fontSize='large' />
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
                                    <LocationOnOutlinedIcon fontSize='large' />
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

                        {selectedPlace.BEZUGNR && <ListItem className={classes.listItem}>
                            <ListItemAvatar>
                                <Avatar className={classes.listAvatar}>
                                    <LocationOnOutlinedIcon fontSize='large' />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={selectedPlace?.BEZUGNR}
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
                                    <LocationOnOutlinedIcon fontSize='large' />
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
                                    <LocationOnOutlinedIcon fontSize='large' />
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
    );
}

export default PlaceDetails