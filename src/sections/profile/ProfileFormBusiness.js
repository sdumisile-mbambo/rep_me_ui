import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, Typography, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
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
import Iconify from '../../components/Iconify';
import { FormProvider, RHFTextField } from '../../components/hook-form';
import { industryOptions } from '../../data/IndustryList';
import { cilentOptions } from '../../data/ClientOptions';
import { productOptions } from '../../data/ProductsList';
import { salesTypes } from '../../data/SalesTypesList';
import { locationOptions } from '../../data/LocationOptions';
// ----------------------------------------------------------------------
import ProfileSerice from '../../services/ProfileService';

const MAX = 1000000;
const MIN = 1000;
const marks = [
  {
    value: MIN,
    label: '',
  },
  {
    value: MAX,
    label: '',
  },
];

export default function ProfileFormBusiness({ profile }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const [userProfile,setUserProfile ] = useState(profile);
  const _profileService = new ProfileSerice();
  const [address, setAddress] = useState(
    userProfile?.businessProfile?.address != null ? userProfile?.businessProfile?.address : ''
  );
  const [natureOfBusiness, setNatureOfBusiness] = useState(
    userProfile?.businessProfile?.natureOfBusiness != null ? userProfile?.businessProfile?.natureOfBusiness : null
  );
  const [clients, setClients] = useState([]);
  const [salesType, setSalesType] = useState('');
  const [duration, setDuration] = useState(3);
  const [value1, setValue1] = useState([0, 10000]);
  const [noOfAgents, setNoOfAgents] = useState(1);
  const [targetSales, setTargetSales] = useState(1);
  const minDistance = 1000;
  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('Nature Of business is required'),
  });

  const defaultValues = {
    name: userProfile?.businessProfile?.businessName,
    contactPersonName: userProfile?.user?.name,
    contactPersonSurname: userProfile?.user?.surname,
    contactEmail: userProfile?.user?.email,
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
    const request = {
      ...defaultValues,
      address,
      natureOfBusiness,
    };
    console.log('default values', request);
    const token = await sessionStorage.getItem('authToken');

    _profileService
      .updateBusinessProfile(request, token)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((responseJson) => {
        console.log('UPDATE-AGENT-PROFILE|RESPONSE', responseJson);
        setUserProfile(request);
      })
      .catch((error) => {
        console.log('UPDATE-AGENT-PROFILE|ERROR', error);
      });
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleClientsChange = (event) => {
    const {
      target: { value },
    } = event;
    setClients(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const handleSalesTypeChange = (event) => {};
  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  const handleNoOfAgentsChange = (event) => {
    setNoOfAgents(event.target.value);
  };

  const handleTargetSalesChange = (event) => {
    setTargetSales(event.target.value);
  };

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
    };
  }

  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Buisines Details
        </Typography>

        <RHFTextField name="name" label="Business name" disabled />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Location</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={address}
            label="Location"
            onChange={(event) => setAddress(event.target.value)}
          >
            {locationOptions.map((locationOption) => (
              <MenuItem key={locationOption} value={locationOption}>
                {locationOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Nature of business</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={natureOfBusiness}
            label="Nature of business"
            onChange={(event) => setNatureOfBusiness(event.target.value)}
          >
            {industryOptions.map((industryOption) => (
              <MenuItem key={industryOption} value={industryOption}>
                {industryOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Buisines Contact Person Details
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="contactPersonName" label="First name" disabled />
          <RHFTextField name="contactPersonSurname" label="Last name" disabled />
        </Stack>
        <RHFTextField name="contactEmail" label="Contact Person Email" disabled />

        {/* <Typography variant="h4" sx={{ mb: 1 }}>
          Buisines Operational Details
        </Typography>

        <FormControl>
          <InputLabel id="demo-multiple-name-label">Products / Services</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={products}
            onChange={handleProductChange}
            input={<OutlinedInput label="Products / Services" />}
            MenuProps={MenuProps}
          >
            {productOptions.map((productOption) => (
              <MenuItem key={productOption} value={productOption} style={getStyles(productOption, products, theme)}>
                {productOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel id="demo-multiple-name-label">Target market / Clients </InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={clients}
            onChange={handleClientsChange}
            input={<OutlinedInput label="Target market / Clients" />}
            MenuProps={MenuProps}
          >
            {cilentOptions.map((clientOption) => (
              <MenuItem key={clientOption} value={clientOption} style={getStyles(clientOption, clients, theme)}>
                {clientOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Industry</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={industry}
            label="Industry"
            onChange={handleIndustryChange}
          >
            {industryOptions.map((industryOption) => (
              <MenuItem key={industryOption} value={industryOption}>
                {industryOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Type of sales support required</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={salesType}
            label="Type of sales support required"
            onChange={(event)=> setSalesType(event.target.value)}
          >
            {salesTypes.map((salesType) => (
              <MenuItem key={salesType} value={salesType}>
                {salesType}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Typography variant="h4" sx={{ mb: 1 }}>
          Requires Services Details
        </Typography>
        <FormControl sx={{ marginTop: 3 }}>
          <FormLabel id="demo-radio-buttons-group-label">Duration of sales services needed</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue={duration}
            name="radio-buttons-group"
            row
            onChange={(event) => setDuration(event.target.value)}
          >
            <FormControlLabel value={3} control={<Radio />} label="3 Months" />
            <FormControlLabel value={6} control={<Radio />} label="6 Months" />
            <FormControlLabel value={12} control={<Radio />} label="1 Year" />
            <FormControlLabel value={13} control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
        <FormControl sx={{ marginTop: 3 }}>
          <FormLabel id="demo-radio-buttons-group-label">Budget Available</FormLabel>
          <Slider
            getAriaLabel={() => 'Salary Range'}
            value={value1}
            step={1000}
            onChange={handleChange1}
            valueLabelDisplay="auto"
            disableSwap
            min={MIN}
            max={MAX}
          />
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Typography variant="body2" sx={{ cursor: 'pointer' }}>
              ZAR {MIN} min
            </Typography>
            <Typography variant="body2" sx={{ cursor: 'pointer' }}>
              ZAR 1 000 000 max
            </Typography>
          </Stack>
        </FormControl>

        <FormControl sx={{ marginTop: 3 }}>
          <FormLabel id="demo-radio-buttons-group-label">No. of Agents Required</FormLabel>
          <Slider
            defaultValue={noOfAgents}
            aria-label="Default"
            valueLabelDisplay="auto"
            value={noOfAgents}
            onChange={handleNoOfAgentsChange}
          />
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Typography variant="body2" sx={{ cursor: 'pointer' }}>
              1 Agent
            </Typography>
            <Typography variant="body2" sx={{ cursor: 'pointer' }}>
              100 Agents
            </Typography>
          </Stack>
        </FormControl>

        <FormControl sx={{ marginTop: 3 }}>
          <FormLabel id="demo-radio-buttons-group-label">Sales Target to be reached in Rand value</FormLabel>
          <Slider
            defaultValue={targetSales}
            aria-label="Default"
            valueLabelDisplay="auto"
            value={targetSales}
            onChange={handleTargetSalesChange}
          />
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Typography variant="body2" sx={{ cursor: 'pointer' }}>
              ZAR 1000
            </Typography>
            <Typography variant="body2" sx={{ cursor: 'pointer' }}>
              ZAR 1 000 000
            </Typography>
          </Stack>
        </FormControl> */}

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Update
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
