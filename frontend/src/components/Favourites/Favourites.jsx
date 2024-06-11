import { Box, Card, CardContent, CardHeader, Container, CssBaseline, Divider, Grid, IconButton, ThemeProvider, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader'
import { theme } from '../../utils/themeProvider';
import Header from '../Header/Header';
import ErrorHandler from '../ErrorHandler/ErrorHandler';
import api, { routes } from '../../api';
import { generateURL, parseFavouriteData } from '../../general';
import { getResponseError, getResponseInfo } from '../../utils/errorUtils';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CallIcon from '@mui/icons-material/Call';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import CategoryIcon from '@mui/icons-material/Category';


const Favourites = () => {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [favDetails, setFavDetails] = useState(null);
    const [noFav, setNoFav] = useState(false);


    const userId = localStorage.getItem('user_id');

    const getFavourites = async () => {
        setLoading(true);
        try {
            const favouriteUrl = generateURL(routes.getFavourite, { id: userId });
            const res = await api.get(favouriteUrl);
            const parseData = parseFavouriteData(res?.data);
            if (parseData != null) {
                setFavDetails(parseData);
            } else {
                setFavDetails(null);
                const responseInfo = getResponseInfo(res);
                setNoFav(responseInfo);
            }
        } catch (error) {
            const errorData = getResponseError(error);
            setError(errorData);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getFavourites();
    }, []);

    const removeFromFavourite = async (item) => {
        try {
            const formData = new FormData();
            formData.append('category', Number(item.category));
            formData.append('item', Number(item.item));
            const deleteFavouriteUrl = generateURL(routes.deleteFavourite, { id: userId });
            const response = await api.delete(deleteFavouriteUrl, {
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            const responseInfo = getResponseInfo(response);
            setError(responseInfo);
            getFavourites();
        } catch (errorResponse) {
            const errorData = getResponseError(errorResponse);
            setError(errorData);
        } finally {
            setLoading(false);
        }
    }


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {isLoading && <Loader />}
            <Header isLoginPage={false}/>

            {!isLoading && <Container maxWidth="md" sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom> Favourites </Typography>

                {!favDetails && (
                    <Card sx={{ mt: 2, backgroundColor: 'secondary.main' }} >
                            <CardHeader
                                title={noFav?.message?.detail}
                                titleTypographyProps={{ variant: 'h6', style: { fontSize: '20px' } }}
                            />
                    </Card>
                )}
                {favDetails && favDetails.map((item, index) => {
                    return (
                        <Card sx={{ mt: 2, backgroundColor: 'secondary.main' }} key={index} >
                            <CardHeader
                                action={
                                    <IconButton onClick={() => removeFromFavourite(item)}>
                                        <FavoriteIcon fontSize="large" style={{ color: 'red' }} />
                                    </IconButton>
                                }
                                title={item?.DESCRIPTION}
                                titleTypographyProps={{ variant: 'h6', style: { fontSize: '20px' } }}
                                subheader={item?.ART ? item?.ART : ''}
                            />
                            <Divider />
                            <CardContent>
                                <Typography component={'span'} variant="body2" color="text.secondary">{`${item?.STREET}, ${item?.POSTCODE}, ${item?.LOCATION}`}</Typography><br />
                                <Grid container sx={{ p: 1 }}>
                                    <Grid xs={12} sm={4} >
                                        <Box display="flex" alignItems="center" mb={1}>
                                            <Tooltip title="Art">
                                                <CategoryIcon fontSize="small" />
                                            </Tooltip>
                                            <Typography component="span" variant="body2" color="text.secondary" ml={1}>
                                                {item?.ART || 'No Art Provided'}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid xs={12} sm={4} >
                                        <Box display="flex" alignItems="center" mb={1}>
                                            <Tooltip title="Phone Number">
                                                <CallIcon fontSize="small" />
                                            </Tooltip>
                                            <Typography component="span" variant="body2" color="text.secondary" ml={1}>
                                                {item?.PHONE || 'No Phone Number'}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid xs={12} sm={4} >
                                        <Box display="flex" alignItems="center" mb={1}>
                                            <Tooltip title="Traeger">
                                                <VolunteerActivismIcon fontSize="small" />
                                            </Tooltip>
                                            <Typography component="span" variant="body2" color="text.secondary" ml={1}>
                                                {item?.TRAEGER || 'No Traeger Provided'}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    )
                })}

            </Container>}


            {error && <ErrorHandler error={error} onClose={() => { setError(null) }} />}

        </ThemeProvider>

    )
}

export default Favourites