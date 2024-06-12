import * as React from 'react';
import {Link as RouterLink, useLocation, useNavigate} from 'react-router-dom';
import {useEffect, useState, createRef} from 'react';
// material
import {
    Card,
    Button,
    Container,
    Stack,
    Typography,
    Grid,
    IconButton,
    Box,
    Avatar,
    AlertTitle,
    Snackbar,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import {styled} from '@mui/material/styles';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';

import AdminService from '../../services/AdminService';
// mock
import POSTS from '../../_mock/blog';
import CuisineMenus from './CuisineMenus';
// ----------------------------------------------------------------------

const AvatarStyle = styled(Avatar)(({theme}) => ({
    width: 250,
    height: 250,
    margin: 20,
}));

export default function ViewCuisine() {
    const _adminService = new AdminService();
    const navigate = useNavigate();
    const location = useLocation();
    const {cuisine} = location.state;
    const fileRef = createRef();

    const {name, description, coverImage, menuList, active} = cuisine;
    console.log('cuisine', cuisine);
    const [coverPhotoWeb, setCoverPhotoWeb] = useState(coverImage);
    const [coverPhotoFile, setCoverPhotoFile] = useState(coverImage);
    const [displayError, setDisplayError] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    const onFileInputChange = (e) => {
        setCoverPhotoWeb(URL.createObjectURL(e.target.files[0]));
        setCoverPhotoFile(e.target.files[0]);
    };

    const updatePicture = async () => {
        const formData = new FormData();
        formData.append('cuisineId', cuisine.id);
        formData.append('file', coverPhotoFile);
        const token = await sessionStorage.getItem('authToken');
        _adminService
            .updateCuisineCoverImage(token, formData)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((responseJson) => {
                console.log('GET-CHEFS-RESPONSE-JSON|RESPONSE', responseJson);
                if (responseJson != null) {
                    displayOutcome(true);
                } else {
                    displayOutcome(false);
                }
            })
            .catch((error) => {
                console.log('GET-CHEFS-CATCH-ERROR|ERROR', error);
            });
    };

    const displayOutcome = (success) => {
        if (success) {
            setDisplaySuccess(true);
            setDisplayError(false);
        } else {
            setDisplayError(true);
            setDisplaySuccess(false);
        }
    };

    const Alert = React.forwardRef((props, ref) => {
        return <MuiAlert elevation={6} ref={ref}  {...props} sx={{width: 300}}/>;
    });

    const handleSuccssClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setDisplaySuccess(false);
    };

    const handleErrorClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setDisplayError(false);
    };


    return (
        <Page title="View Cuisine">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        {name}
                    </Typography>

                    <Button
                        variant="contained"
                        component={RouterLink}
                        to="/dashboard/add/menu"
                        startIcon={<Iconify icon="eva:plus-fill"/>}
                        state={{cuisine}}
                    >
                        Add Menu
                    </Button>
                </Stack>

                <Stack direction="row" alignItems="center" justifyContent="center" mb={5} ml={3} mr={3}>
                    <Card
                        sx={{
                            py: 5,
                            textAlign: 'center',
                            width: '100%',
                        }}
                    >
                        <Grid item xs={12} sm={6} md={8}>
                            <Grid item xs={8}>
                                <IconButton aria-label="delete" onClick={() => fileRef.current?.click()}>
                                    <AvatarStyle alt={`${cuisine?.name}`} src={coverPhotoWeb}/>
                                    <input
                                        type="file"
                                        style={{display: 'none'}}
                                        ref={fileRef}
                                        onChange={onFileInputChange}
                                        accept="image/png,image/jpeg,image/gif"
                                    />
                                </IconButton>
                            </Grid>
                            <Grid item xs={4}>
                                <Stack direction="column" alignItems="center" justifyContent="center" mb={5} ml={3}
                                       mr={3}>
                                    <Stack direction="column" alignItems="center" justifyContent="center" mb={5} ml={3}
                                           mr={3}>
                                        <Typography variant="subtitle2" sx={{color: 'text.secondary'}} noWrap>
                                            {name}
                                        </Typography>
                                        <Typography variant="body2"
                                                    sx={{color: 'text.secondary', wordWrap: 'break-word'}}>
                                            {description}
                                        </Typography>
                                    </Stack>
                                </Stack>
                                <Stack direction="column" alignItems="flex-end" justifyContent="flex-end" mb={1} mr={3}>
                                    <Button variant="outlined" startIcon={<Iconify icon="eva:save"/>}
                                            onClick={updatePicture}>
                                        Update
                                    </Button>
                                </Stack>
                            </Grid>
                        </Grid>
                        <Stack direction="column" alignItems="center" justifyContent="center" mb={1} ml={3} mr={3}>
                            <Snackbar open={displaySuccess} autoHideDuration={5000} mt={290}
                                      anchorOrigin={{
                                          horizontal: 'right'
                                          , vertical: 'top'
                                      }} onClose={handleSuccssClose}>
                                <Alert severity="success">
                                    <AlertTitle>Success</AlertTitle>
                                    Cuisine updated successfully.
                                </Alert>
                            </Snackbar>

                            <Snackbar open={displayError} autoHideDuration={5000} anchorOrigin={{
                                horizontal: 'right'
                                , vertical: 'top'
                            }} onClose={handleErrorClose}>
                                <Alert severity="error">
                                    <AlertTitle>Error</AlertTitle>
                                    Oops - Something went wrong.
                                </Alert>
                            </Snackbar>
                        </Stack>
                    </Card>
                </Stack>

                <Stack direction="column" alignItems="flex-start" justifyContent="space-between">
                    <Typography variant="h4" gutterBottom>
                        Menus
                    </Typography>
                </Stack>
                <Stack direction="column" alignItems="center" justifyContent="space-between" mb={12}>
                    <CuisineMenus cuisineMenus={menuList}/>
                </Stack>
            </Container>
        </Page>
    );
}
