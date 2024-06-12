import React, { useState, useEffect } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Box, Card } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
// ----------------------------------------------------------------------
import ProfileFormBusiness from '../../sections/profile/ProfileFormBusiness';
import ProfileFormAgent from '../../sections/profile/ProfileFormAgent';
import ProfileSerice from '../../services/ProfileService';
// components
import Page from '../../components/Page';
import PricingEditable from '../../components/PricingEditable';

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

  const curentPackage = {
    name: 'Basic',
  };
  return (
    <Page title="Profile">
      <Container maxWidth="xl">
        {userProfile == null ? (
          <>
            <Skeleton variant="rounded" width={'100%'} height={500} />
          </>
        ) : (
          <Box sx={{marginTop: 2}}>
            {isAgent ? (
              <ProfileFormAgent profile={userProfile} setUserProfile={setUserProfile} />
            ) : (
              <ProfileFormBusiness profile={userProfile} setUserProfile={setUserProfile} />
            )}
          </Box>
        )}
      </Container>
    </Page>
  );
}
