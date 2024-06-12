import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment, Alert, AlertTitle } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import AuthSerice from '../../../services/AuthenticationService';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const _authService = new AuthSerice();
  const [showPassword, setShowPassword] = useState(false);
  const [signInFailed, setSignInFailed] = useState(false);

  const LoginSchema = Yup.object().shape({
    username: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    username: '',
    password: '',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = async (values) => {
    console.log(errors);
    _authService
      .signIn(values)
      .then((response) => {
        console.log('response', response);
        if (response.status.toString() === '401') {
          setSignInFailed(true);
          return null;
        }
        if (!response.ok) {
          throw new Error('Something went wrong.');
        }
        if (response.ok) {
          setSignInFailed(false);
          return response.json();
        }
      })
      .then((responseJson) => {
        if (responseJson != null) {
          sessionStorage.setItem('authToken', responseJson.token);
          sessionStorage.setItem('user', JSON.stringify(responseJson));
          navigate('/home/dashboard', { replace: true });
        }
      })
      .catch((error) => {
        console.error(error);
        // setIsBusy(false);
      });

    console.log(values);
    // navigate('/dashboard', { replace: true });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="username" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      {signInFailed ? (
        <Stack direction="row" alignItems="center" justifyContent="center" sx={{ my: 2 }}>
          <Alert severity="error" style={{ width: '100%' }}>
            <AlertTitle>Error</AlertTitle>
            Username or Password incorrect.
          </Alert>
        </Stack>
      ) : null}

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Login
      </LoadingButton>
    </FormProvider>
  );
}
