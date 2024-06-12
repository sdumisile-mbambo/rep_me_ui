import {Link as RouterLink} from 'react-router-dom';
import {useEffect, useState} from 'react';
// material
import {Grid, Button, Container, Stack, Typography, Paper} from '@mui/material';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import {BlogPostCard} from '../../sections/@dashboard/blog';
import AdminService from '../../services/AdminService';


export default function Cuisines() {
    const _adminService = new AdminService();
    const [cuisineList, setCuisineList] = useState([]);


    useEffect(() => {
        async function fecthChefs() {
            const token = await sessionStorage.getItem('authToken');
            _adminService
                .getCuisineList(token)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                })
                .then((responseJson) => {
                    console.log('GET-CHEFS-RESPONSE-JSON|RESPONSE', responseJson);
                    if (responseJson != null) {
                        setCuisineList(responseJson);
                    }
                })
                .catch((error) => {
                    console.log('GET-CHEFS-CATCH-ERROR|ERROR', error);
                });
        }

        fecthChefs();
    }, []);

    return (
        <Page title="Dashboard: Blog">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} >
                    <Typography variant="h4" gutterBottom>
                        Cuisines
                    </Typography>
                    <Button variant="contained" component={RouterLink} to="/dashboard/add/cuisine"
                            startIcon={<Iconify icon="eva:plus-fill"/>}>
                        New Cuisine
                    </Button>
                </Stack>
                {cuisineList.length === 0 ? (<Paper sx={{ height: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <Typography gutterBottom align="center" variant="subtitle1">
                        Not Cuisines Found
                    </Typography>
                    <Typography variant="body2" align="center">
                        There are currently no cuisines. Click  &nbsp;
                        <strong>&quot; + New Cuisine&quot;</strong> to add a new cuisine.
                    </Typography>
                </Paper>) : (<Grid container spacing={3}>
                    {cuisineList.map((item) => (
                        <BlogPostCard key={item.id} cuisine={item}/>
                    ))}
                </Grid>)

                }


            </Container>
        </Page>
    );
}
