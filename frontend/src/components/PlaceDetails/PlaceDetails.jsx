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

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    // useEffect(() => {
    //     console.log("selected place", selectedPlace);
    // }, [selectedPlace])

    console.log(selectedPlace);

    return (
        <Box className={classes.placeDetailsCard}>
            <Card className={classes.card} sx={{ maxWidth: 345 }}>
                <CardHeader
                    action={
                        <IconButton onClick={onClose} className={classes.closeButton}>
                            <CloseIcon />
                        </IconButton>
                    }
                    title={selectedPlace?.BEZEICHNUNG}
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
                    <IconButton aria-label="Favourites">
                        <Avatar sx={{ bgcolor: 'red' }}>
                            <FavoriteIcon />
                        </Avatar>
                    </IconButton>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <Avatar>

                            <ExpandMoreIcon />
                        </Avatar>
                    </ExpandMore>
                </CardActions>
                <Divider />
                <CardContent sx={{ padding: 0 }}>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'primary' }}>
                        <ListItem className={classes.listItem}>
                            <ListItemAvatar>
                                <Avatar className={classes.listAvatar}>
                                    <LocationOnOutlinedIcon fontSize='large' />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={`${selectedPlace?.STRASSE} ${selectedPlace?.PLZ} ${selectedPlace?.ORT}`}
                                primaryTypographyProps={{
                                    variant: 'body1',
                                    color: 'secondary',
                                    fontStyle: 'italic',
                                }} />
                        </ListItem>
                        <ListItemButton>

                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <WorkIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Work" secondary="Jan 7, 2014" />
                            </ListItem>
                        </ListItemButton>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <BeachAccessIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Vacation" secondary="July 20, 2014" />
                        </ListItem>
                    </List>
                </CardContent>

                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent sx={{ overflowY: 'auto', maxHeight: 'calc(100vh - 86vh)' }}>
                        <Typography paragraph>Method:</Typography>
                        <Typography paragraph>
                            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                            aside for 10 minutes.
                        </Typography>
                        <Typography paragraph>
                            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                            large plate and set aside, leaving chicken and chorizo in the pan. Add
                            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                            stirring often until thickened and fragrant, about 10 minutes. Add
                            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                        </Typography>
                        <Typography paragraph>
                            Add rice and stir very gently to distribute. Top with artichokes and
                            peppers, and cook without stirring, until most of the liquid is absorbed,
                            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                            mussels, tucking them down into the rice, and cook again without
                            stirring, until mussels have opened and rice is just tender, 5 to 7
                            minutes more. (Discard any mussels that don&apos;t open.)
                        </Typography>
                        <Typography>
                            Set aside off of the heat to let rest for 10 minutes, and then serve.
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </Box>
    );
}

export default PlaceDetails