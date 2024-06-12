/* eslint-disable spaced-comment */
import {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
// material
import {Stack, Container, Typography, Grid} from '@mui/material';
// components
import Page from '../../components/Page';
import AdminService from '../../services/AdminService';
import EditMenuForm from "./EditMenuForm";
import MenuPhotoGrid from "../../sections/@dashboard/menus/MenuPhotoGrid";

export default function EditMenu(props) {
    const [page, setPage] = useState(0);
    const navigate = useNavigate();
    const _adminService = new AdminService();

    const location = useLocation();
    const {menu} = location.state;
    const [menuPhotos, setMenuPhotos] = useState(null);
   

    console.log('menu here', menu);

    const updateChef = (file) => {
        setMenuPhotos(file);
    };

    const submitUpdate = async (values) => {
        const formData = new FormData();
        formData.append('chefId', menu.id);
        formData.append('file', menuPhotos);
        const token = await sessionStorage.getItem('authToken');
        _adminService
            .updateMenuGallery(token, formData)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((responseJson) => {
                console.log('GET-CHEFS-RESPONSE-JSON|RESPONSE', responseJson);
                // if (responseJson != null) {
                //     navigate('/dashboard/chefs', {replace: true});
                // }
            })
            .catch((error) => {
                console.log('GET-CHEFS-CATCH-ERROR|ERROR', error);
            });
    };

    return (
        <Page title="Edit Chef">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        {menu?.name}
                    </Typography>
                </Stack>
                <Grid container spacing={2}>
                    <Grid xs={5}>
                        <MenuPhotoGrid chef={menu} updateChefPicture={updateChef}/>
                    </Grid>
                    <Grid xs={7}>
                        <EditMenuForm menu={menu} onSubmit={submitUpdate}/>
                    </Grid>
                </Grid>
            </Container>
        </Page>
    );
}
