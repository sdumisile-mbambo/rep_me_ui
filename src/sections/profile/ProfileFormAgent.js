import * as Yup from 'yup';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, Switch, InputAdornment, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Slider from '@mui/material/Slider';
// components

import { FormProvider, RHFTextField } from '../../components/hook-form';
import { locationOptions } from '../../data/LocationOptions';
import { availabilityOptions } from '../../data/AvailabityList';

import ProfileSerice from '../../services/ProfileService';
import FeedBackModal from '../../components/FeedBackModal';
// ----------------------------------------------------------------------

export default function ProfileFormAgent({ profile , setUserProfile }) {
  const navigate = useNavigate();
  const [userProfile] = useState(profile);
  const [dob, setDob] = useState('1990-04-17');
  const [location, setLocation] = useState(userProfile?.address);
  const [hasLicense, setHasLicense] = useState(userProfile?.hasDriversLicense);
  const [hasCar, setHasCar] = useState(
    userProfile?.hasOwnTransport !== null ? userProfile?.hasOwnTransport : false
  );
  const [qualification, setQualification] = useState(userProfile?.qualification);
  const [hasExperience, setHasExperience] = useState(false);
  const [hasSalesExperience, setHasSalesExperience] = useState(false);
  const [renumeration, setRenumeration] = useState(userProfile?.expectedRemuneration !== null ? userProfile?.expectedRemuneration : 1000);
  const [shortCourceOptIn, setShortCourceOptIn] = useState(userProfile?.shortCourses !== null ? userProfile?.shortCourses : false);
  const [availability, setAvaiilabity] = useState( userProfile?.availability !== null ? userProfile?.availability : '');
  const [isShortTerm, setIsShortTerm] = useState(userProfile?.shortTermPositions !== null ? userProfile?.shortTermPositions : false);
  const [isPhonePreffered, setIsPhonePreffered] = useState(userProfile?.phoneWork? "phone": "face");
  const [open, setOpen] = useState(false);
  const [header, setHeader]= useState("");
  const [body, setBody]= useState("");
  const _profileService = new ProfileSerice();
  const [isBusy, setIsBusy] = useState(false);

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('First name required'),
    surname: Yup.string().required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    idNumber: Yup.string().required('Id Number is required'),
    phone: Yup.string().required('Phone Number is required'),
  });

  const handleClose=()=>{
    setOpen(false);
  }



  const defaultValues = {
    name: userProfile?.name,
    surname: userProfile?.surname,
    email: userProfile?.email,
    idNumber: userProfile?.idNumber,
    phone: userProfile?.contactNumber,
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
    const request = {
      ...values,
      availability,
      address: location,
      qualification,
      expectedRemuneration: renumeration,
      hasDriversLicense: hasLicense,
      hasOwnTransport: hasCar,
      shortCourses: shortCourceOptIn,
      shortTermPositions: isShortTerm,
      phoneWork: isPhonePreffered === 'phone',
      fieldWork: isPhonePreffered === 'phone',
    };

    const token = await sessionStorage.getItem('authToken');

    _profileService
      .updateAgentProfile(request, token)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((responseJson) => {
        setHeader("Profile Update");
        setBody("Your profile details have been updated successfully.");
        setOpen(true);
        setUserProfile(request);
        setIsBusy(false);
      })
      .catch((error) => {
        setHeader("Profile Update");
        setBody("We were unable to update your profile at this moment. Please try again later.");
        setOpen(true);
        console.log('UPDATE-AGENT-PROFILE|ERROR', error);
        setIsBusy(false);
      });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Personal Details
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="name" label="First name" />
          <RHFTextField name="surname" label="Last name" />
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="idNumber" label="ID Number" />
          <DatePicker
            value={dayjs(dob)}
            onChange={(newValue) => setDob(newValue)}
            label="Date Picker"
            defaultValue={dayjs('1990-04-17')}
            sx={{ width: '-webkit-fill-available' }}
          />
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="phone" label="Phone Number" disabled />
          <RHFTextField name="email" label="Email address" disabled />
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Location</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={location}
              label="Location"
              onChange={(event) => setLocation(event.target.value)}
            >
              {locationOptions.map((locationOption) => (
                <MenuItem key={locationOption} value={locationOption}>
                  {locationOption}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Highest Qualification</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={qualification}
              label="Hiighest Qualification"
              onChange={(event) => {
                setQualification(event.target.value);
              }}
            >
              <MenuItem value="Matric">Matric</MenuItem>
              <MenuItem value="Bachelor's Degree">Bachelor's Degree</MenuItem>
              <MenuItem value="Honours Degree">Honours Degree</MenuItem>
              <MenuItem value="Master's Degree">Master's Degree</MenuItem>
              <MenuItem value="Doctorate Degree">Doctorate Degree</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Employment Details
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <FormControlLabel
            control={<Switch />}
            label="Do you have a driver's license?"
            checked={hasLicense}
            onChange={(event) => {
              setHasLicense(event.target.checked);
            }}
            sx={{ width: '-webkit-fill-available' }}
          />
          <FormControlLabel
            control={<Switch />}
            label="Do you have your own car?"
            checked={hasCar}
            onChange={(event) => {
              setHasCar(event.target.checked);
            }}
            sx={{ width: '-webkit-fill-available' }}
          />
          <FormControlLabel
            control={<Switch />}
            label="Do you have previous sales experience?"
            checked={hasSalesExperience}
            onChange={(event) => {
              setHasSalesExperience(event.target.checked);
            }}
            sx={{ width: '-webkit-fill-available' }}
          />
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <FormControlLabel
            control={<Switch />}
            label="Are willing to do short term courses to get started?"
            checked={shortCourceOptIn}
            onChange={(event) => {
              setShortCourceOptIn(event.target.checked);
            }}
            sx={{ width: '-webkit-fill-available' }}
          />
          <FormControlLabel
            control={<Switch />}
            label="Are you interested in short term roles?"
            checked={isShortTerm}
            onChange={(event) => {
              setIsShortTerm(event.target.checked);
            }}
            sx={{ width: '-webkit-fill-available' }}
          />
          <FormControl sx={{ width: '-webkit-fill-available' }}>
            <FormLabel id="demo-radio-buttons-group-label">How are you most confortabl working?</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              value={isPhonePreffered}
              onChange={(event) => {
                setIsPhonePreffered(event.target.value);
              }}
            >
              <FormControlLabel value="phone" control={<Radio />} label="Via Phone" />
              <FormControlLabel value="face " control={<Radio />} label="Face to Face" />
            </RadioGroup>
          </FormControl>
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Availability</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={availability}
              label="Location"
              onChange={(event) => setAvaiilabity(event.target.value)}
            >
              {availabilityOptions.map((availabilityItem) => (
                <MenuItem key={availabilityItem} value={availabilityItem}>
                  {availabilityItem}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isBusy}>
          Update
        </LoadingButton>
        <FeedBackModal   handleClose={handleClose} open={open} header={header} body={body}/>
      </Stack>
    </FormProvider>
  );
}
