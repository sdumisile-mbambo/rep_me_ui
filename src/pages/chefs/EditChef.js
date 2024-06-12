import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// material
import { Stack, Container, Typography, Grid } from '@mui/material';
// components
import ChefDetailForm from '../../sections/@dashboard/chefs/ChefDetailForms';
import ChefProfileCard from '../../sections/@dashboard/chefs/ChefProfileCard';
import Page from '../../components/Page';
import AdminService from '../../services/AdminService';

export default function EditChef(props) {
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const _adminService = new AdminService();

  const location = useLocation();
  const { chef } = location.state;
  const [chefAvatar, setChefAvatar] = useState(null);
  const { name, surname } = chef;

  const updateChef = (file) => {
    setChefAvatar(file);
  };

  const submitUpdate = async (values) => {
    const formData = new FormData();
    formData.append('chefId', chef.id);
    formData.append('file', chefAvatar);
    const token = await sessionStorage.getItem('authToken');
    _adminService
      .updateChefProfilPicture(token, formData)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((responseJson) => {
        console.log('GET-CHEFS-RESPONSE-JSON|RESPONSE', responseJson);
        if (responseJson != null) {
          navigate('/dashboard/chefs', { replace: true });
        }
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
            {`Chef ${name} ${surname}`}
          </Typography>
        </Stack>
        <Grid container spacing={2}>
          <Grid xs={5}>
            <ChefProfileCard chef={chef} updateChefPicture={updateChef} />
          </Grid>
          <Grid xs={7}>
            <ChefDetailForm chef={chef} onSubmit={submitUpdate} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
