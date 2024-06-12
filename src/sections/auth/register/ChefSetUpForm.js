/* eslint-disable no-useless-escape */
import * as Yup from 'yup';
import { useState, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Buffer } from 'buffer';
// @mui
import { Link, Stack, IconButton, InputAdornment, Alert, AlertTitle, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import AuthenticationService from '../../../services/AuthenticationService';
import FormValidatorService from '../../../services/FormValidatorService';

// ----------------------------------------------------------------------

export default function ChefSetUpForm(props) {
  const navigate = useNavigate();
  const passwordErrorText =
    'Password should be at least 8 characters long, contains at least 1 lowercase, 1 uppercase, 1 special character and 1 numeric character.';
  const confirmPasswordErrorMessage = 'Passwords do not match!';
  const _authService = new AuthenticationService();
  const [showPassword, setShowPassword] = useState(false);
  const [signInFailed, setSignInFailed] = useState(false);

  const { userEmail } = props;
  const LoginSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password is required')
      .matches(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, passwordErrorText),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], confirmPasswordErrorMessage)
      .required('Required'),
  });

  const decodeBase64 = (data) => (Buffer.from(data, 'base64').toString('ascii'));

  const defaultValues = {
    email: decodeBase64(userEmail),
    password: '',
    confirmPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setError,
    register,
    formState: { isSubmitting, errors, values },
  } = methods;

  const validateFormValues = (values) => {
    let formValid = true;
    if (!FormValidatorService.verifyPassword(values.password)) {
      setError('password', {
        type: 'custom',
        message: passwordErrorText,
      });
      formValid = false;
    }
    return formValid;
  };


  // TO DO change to  set chef password method.
  const onSubmit = async (values) => {
    if (validateFormValues(values)) {
      _authService
        .createChefLogin(values.email, values.password)
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
            navigate('/register/complete', { replace: true });
          }
        })
        .catch((error) => {
          console.error(error);
          // setIsBusy(false);
        });
    }
    console.log(values);
    // navigate('/dashboard', { replace: true });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="email" label="Email address" disabled />
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

        <RHFTextField
          name="confirmPassword"
          label="Confirm password"
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
        {/* <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link> */}
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Complete set up
      </LoadingButton>
    </FormProvider>
  );
}
