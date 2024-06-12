import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
import { Card, Grid, Avatar, CardContent, Stack, IconButton, InputAdornment } from '@mui/material';
import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useDropzone} from 'react-dropzone'
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
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

ChefDetailForm.propTypes = {
  chef: PropTypes.object.isRequired,
};

export default function ChefDetailForm({ chef, onSubmit }) {
  const { name, surname,email, chefSummary, profilePicture } = chef;
  const navigate = useNavigate();
  console.log(chef);

  const ChefProfileSchema = Yup.object().shape({
    name: Yup.string().required('Chef name is required'),
    surname: Yup.string().required('Chef surname is required'),
    email: Yup.string().required('Chef email is required'),
    chefSummary: Yup.string().required('Chef Summary is required'),
  });

  const defaultValues = {
    name,
    surname,
    email,
    chefSummary,
  };

  const methods = useForm({
    resolver: yupResolver(ChefProfileSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  return (
    <Grid item xs={12} sm={12} md={12}>
      <Card sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
        <CardContent style={{ width: '100%' }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <Stack direction={{ xs: 'column', sm: 'column' }} spacing={2}>
                <RHFTextField name="name" label="First name" />
                <RHFTextField name="surname" label="Last name" />
                <RHFTextField name="email" label="Email address" disabled/>
                <RHFTextField name="chefSummary" label="Chef Summary" minRows={5} multiline/>
                
              </Stack>

              <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                Update
              </LoadingButton>
            </Stack>
          </FormProvider>
        </CardContent>
      </Card>
    </Grid>
  );
}
