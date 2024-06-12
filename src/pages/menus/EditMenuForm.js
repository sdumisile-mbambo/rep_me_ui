import { styled } from '@mui/material/styles';
import { Card, Grid, Avatar, CardContent, Stack, Container, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate, useLocation } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { FormProvider, RHFTextField } from '../../components/hook-form';
import AdminService from '../../services/AdminService';
import Page from '../../components/Page';

export default function EditMenuForm({menu}) {
    const _adminService = new AdminService();
    const navigate = useNavigate();
    const location = useLocation();
    const MenuSchema = Yup.object().shape({
        name: Yup.string().required('Chef name is required'),
        description: Yup.string().required('Cuisine description is required'),
        starter: Yup.string().required('A Starter is required'),
        mainCourse: Yup.string().required('A Main is required'),
        desert: Yup.string().required('A Desert dish is required'),
        ingredients: Yup.string().required('A List of igredients is required'),
    });
    const { cuisine } = location.state;

    const defaultValues = {
        name: '',
        description: '',
    };

    const methods = useForm({
        resolver: yupResolver(MenuSchema),
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
            starter: values.starter,
            mainCourse: values.mainCourse,
            desert: values.desert,
            ingredientsSummary: values.ingredients,
            cuisineId: cuisine.id,
        };
        const token = await sessionStorage.getItem('authToken');

        _adminService
            .addMenu(token, request)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((responseJson) => {
                console.log('GET-CHEFS-RESPONSE-JSON|RESPONSE', responseJson);
                if (responseJson != null) {
                    navigate(`/dashboard/cuisine/${cuisine.id}`, { replace: true });
                }
            })
            .catch((error) => {
                console.log('GET-CHEFS-CATCH-ERROR|ERROR', error);
            });
    };

    return (
        <Page title="Add Menu">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Edit Menu
                    </Typography>
                </Stack>
                <Grid item xs={12} sm={12} md={12}>
                    <Card sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
                        <CardContent style={{ width: '100%' }}>
                            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                                <Stack spacing={3}>
                                    <Stack direction={{ xs: 'column', sm: 'column' }} spacing={2}>
                                        <RHFTextField name="name" label="Menu name" disabled />
                                        <RHFTextField name="starter" label="Starter" disabled/>
                                        <RHFTextField name="mainCourse" label="Main" disabled/>
                                        <RHFTextField name="desert" label="Desert" disabled/>
                                        <RHFTextField
                                            name="ingredients"
                                            label="Main Ingredients"
                                            helperText="Separate ingredients by a comma to comile a list."
                                            disabled
                                        />

                                        <RHFTextField name="description" label="Menu Decsription" minRows={5} multiline disabled/>
                                    </Stack>

                                    <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting} disabled>
                                        Add Menu
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
