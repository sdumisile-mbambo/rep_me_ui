import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import AuthSerice from '../../../services/AuthenticationService';
// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const _authService = new AuthSerice();
  const [showPassword, setShowPassword] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('First name required'),
    surname: Yup.string().required('Last name required'),
    contactNumber: Yup.string().required('Phone Number required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string().required('Confirm Password is required'),
  });

  const defaultValues = {
    name: '',
    surname: '',
    email: '',
    password: '',
    contactNumber: '',
    confirmPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values) => {
    setIsBusy(true);
    values.otp = "0000";
    values.termsAndConditions = false;
    console.log(values);
    _authService
      .registerUser(values)
      .then((response) => {
        console.log('response', response);
        if (response.status.toString() === '401') {
          return null;
        }
        if (!response.ok) {
          throw new Error('Something went wrong.');
        }
        if (response.ok) {
          return response.json();
        }
      })
      .then((responseJson) => {
        setIsBusy(false);
        if (responseJson != null) {
          navigate('/sign-in', { replace: true });
        }
      })
      .catch((error) => {setIsBusy(false);});
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="name" label="First name" />
          <RHFTextField name="surname" label="Last name" />
        </Stack>
        <RHFTextField name="contactNumber" label="Phone Number" />
        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <RHFTextField
          name="confirmPassword"
          label="Confirm Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Register
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
