import { styled } from '@mui/material/styles';
import { Card, Grid, Avatar, CardContent, Stack, Container, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { FormProvider, RHFTextField } from '../../components/hook-form';
import AdminService from '../../services/AdminService';
import Page from '../../components/Page';

export default function AddCuisineForm() {
  const _adminService = new AdminService();
  const navigate = useNavigate();
  const CuisineSchema = Yup.object().shape({
    name: Yup.string().required('Chef name is required'),
    description: Yup.string().required('Cuisine description is required'),
  });

  const defaultValues = {
    name: '',
    description: '',
  };

  const methods = useForm({
    resolver: yupResolver(CuisineSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values) => {
    console.log('values', values);
    const request = {
      name: values.name,
      description: values.description,
    };
    const token = await sessionStorage.getItem('authToken');

    _adminService
      .addCusine(token, request)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((responseJson) => {
        console.log('GET-CHEFS-RESPONSE-JSON|RESPONSE', responseJson);
        if (responseJson != null) {
          navigate('/dashboard/cuisines', { replace: true });
        }
      })
      .catch((error) => {
        console.log('GET-CHEFS-CATCH-ERROR|ERROR', error);
      });
  };

  return (
    <Page title="Add Cuisine">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Add Cuisine
          </Typography>
        </Stack>
        <Grid item xs={12} sm={12} md={12}>
          <Card sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
            <CardContent style={{ width: '100%' }}>
              <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3}>
                  <Stack direction={{ xs: 'column', sm: 'column' }} spacing={2}>
                    <RHFTextField name="name" label="Cuisine name" />
                    <RHFTextField name="description" label="Cuisine Decsription" minRows={5} multiline />
                  </Stack>

                  <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                    Add Cuisine
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
