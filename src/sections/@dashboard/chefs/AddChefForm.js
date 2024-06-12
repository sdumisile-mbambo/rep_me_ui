import PropTypes from 'prop-types';
import { useState, forwardRef } from 'react';
// material
import { styled } from '@mui/material/styles';
import { Card, Grid, Avatar, CardContent, Stack, Container, Typography, MenuItem , Switch, FormControlLabel} from '@mui/material';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Select from '@mui/material/Select';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import Page from '../../../components/Page';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import AdminService from '../../../services/AdminService';

// ----------------------------------------------------------------------

const TitleStyle = styled('div')({
  minHeight: 50,
  fontsize: 23,
});

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  width: 182,
  height: 182,
  margin: 20,
}));

// ----------------------------------------------------------------------

AddChefForm.propTypes = {};

export default function AddChefForm() {
  const navigate = useNavigate();
  const _adminService = new AdminService();
  const [cuisineList, setCuisineList] = useState([]);
  const [isBrandChef, setIsBrandChef]= useState(false);
  const ChefProfileSchema = Yup.object().shape({
    name: Yup.string().required('Chef name is required'),
    surname: Yup.string().required('Chef surname is required'),
    email: Yup.string().required('Chef email is required'),
    chefSummary: Yup.string().required('Chef Summary is required'),
    contactNumber: Yup.string().required('Phone number is required'),
  });

  const defaultValues = {
    name: '',
    surname: '',
    email: '',
    contactNumber: '',
    chefSummary: '',
  };

  const methods = useForm({
    resolver: yupResolver(ChefProfileSchema),
    defaultValues,
  });

  const cuisines = ['Italian Milano', 'Meals in France', 'Greek Mythos', 'Loxion Kulcha'];

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values) => {
    console.log('values', values);
    const token = await sessionStorage.getItem('authToken');
    console.log(cuisineList)

  
    _adminService
      .addChef(token, values.name, values.surname, values.email, values.contactNumber, values.chefSummary,cuisineList, isBrandChef )
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

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCuisineList(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const handleSwitchChange=(event)=>{
    const {
      target: { checked },
    } = event;
    setIsBrandChef(checked);
  }

  return (
    <Page title="Add Chef">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Add Chef
          </Typography>
        </Stack>
        <Grid item xs={12} sm={12} md={12}>
          <Card sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
            <CardContent style={{ width: '100%' }}>
              <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3}>
                  <Stack direction={{ xs: 'column', sm: 'column' }} spacing={2}>
                    <RHFTextField name="name" label="First name" />
                    <RHFTextField name="surname" label="Last name" />
                    <RHFTextField name="email" label="Email address" />
                    <RHFTextField name="contactNumber" label="Phone Number" />
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      multiple
                      value={cuisineList}
                      onChange={handleChange}
                      label="Cuisines"
                    
                    >
                      {cuisines.map((name) => (
                        <MenuItem key={name} value={name} >
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormControlLabel control={<Switch  checked={isBrandChef}  onChange={handleSwitchChange}/>} label="This is an in-house Chef" />
                    <RHFTextField name="chefSummary" label="Chef Summary" minRows={5} multiline />
                  </Stack>

                  <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                    Add Chef
                  </LoadingButton>
                </Stack>
              </FormProvider>
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </Page>
  );
}
