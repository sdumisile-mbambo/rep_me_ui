import React, { useState, useEffect } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Box, Card } from '@mui/material';

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
// sections

import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddCardIcon from '@mui/icons-material/AddCard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Skeleton from '@mui/material/Skeleton';
// ----------------------------------------------------------------------
import ProfileFormBusiness from '../../sections/profile/ProfileFormBusiness';
import ProfileFormAgent from '../../sections/profile/ProfileFormAgent';
import ProfileSerice from '../../services/ProfileService';
// components
import Page from '../../components/Page';

export default function UpdateProfile() {
  const theme = useTheme();
  const [isAgent, setIsAgent] = useState(true);
  const [value, setValue] = React.useState('1');
  const [userProfile, setUserProfile] = useState(null);
  const _profileService = new ProfileSerice();

  useEffect(() => {
    if (userProfile != null && userProfile.businessProfile === null) {
      setIsAgent(true);
    }
  }, [userProfile]);

  useEffect(() => {
    getProfile();
    geBusinessProfile();
  }, []);

  const getProfile = async () => {
    const token = await sessionStorage.getItem('authToken');

    _profileService
      .getAgentProfile(token)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response.statusText;
      })
      .then((responseJson) => {
        console.log('UPDATE-AGENT-PROFILE|RESPONSE', responseJson);
        setUserProfile(responseJson);
      })
      .catch((error) => {
        console.log('UPDATE-AGENT-PROFILE|ERROR', error);
      });
  };


  const geBusinessProfile = async () => {
    const token = await sessionStorage.getItem('authToken');
    _profileService
      .getBuisinessProfile(token)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response.statusText;
      })
      .then((responseJson) => {
        console.log('GET-BUSINESS-PROFILE|RESPONSE', responseJson);
        setIsAgent(false);
        setUserProfile(responseJson);
      })
      .catch((error) => {
        console.error('GET-BUSINESS-PROFILE|ERROR', error);
      });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Page title="Profile">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 1 }}>
          Profile
        </Typography>

        {userProfile == null ? (
          <>
            <Skeleton variant="rounded" width={'100%'} height={60} />
            <Skeleton variant="rounded" width={'100%'} height={60} sx={{marginTop: 5}}/>
          </>
        ) : (
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab icon={<AccountCircleIcon />} iconPosition="start" label="Profle Details" value="1" />
                <Tab icon={<AddCardIcon />} iconPosition="start" label="Billing Details" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              {' '}
              {isAgent ? <ProfileFormAgent profile={userProfile} setUserProfile={setUserProfile}/> : <ProfileFormBusiness profile={userProfile} setUserProfile={setUserProfile}/>}
            </TabPanel>
            <TabPanel value="2">
              <Card />
            </TabPanel>
          </TabContext>
        )}
      </Container>
    </Page>
  );
}
