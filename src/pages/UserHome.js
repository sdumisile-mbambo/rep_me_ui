import React, { useState, useEffect } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';
import ProfileIncompleteCard from '../components/ProfileIncompleteCard';
import ProfileCompleteCard from '../components/ProfileCompleteCard';
import ProfileSerice from '../services/ProfileService';
// ----------------------------------------------------------------------

export default function UserHome() {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [profileComplete, setProfileComplete] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [isAgent, setIsAgent] = useState(false);
  const _profileService = new ProfileSerice();

  useEffect(() => {
    if (userProfile != null) {
      setIsLoading(false);
      if (userProfile?.profileSetup) {
        setProfileComplete(true);
      }
    }
  }, [userProfile]);

  useEffect(() => {
    async function fetchUser() {
      const cachedUser = await JSON.parse(sessionStorage.getItem('user'))
      if (cachedUser.role === "1") {
        getProfile();
        setIsAgent(true);
      }
      if (cachedUser.role === "2") {
        geBusinessProfile();
        setIsAgent(false);
      }
    }
    fetchUser();
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
        setUserProfile(responseJson);
      })
      .catch((error) => {
        console.error('GET-AGENT-PROFILE|ERROR', error);
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
        setUserProfile(responseJson);
      })
      .catch((error) => {
        console.error('GET-BUSINESS-PROFILE|ERROR', error);
      });
  };



  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        {isLoading ? (
          <>
            <Skeleton variant="rounded" width={'100%'} height={200} sx={{ marginBottom: 10 }} />
            <Skeleton variant="rounded" width={'100%'} height={500} />
          </>
        ) : (
          <>
            {profileComplete ? (
              <ProfileCompleteCard
                name={isAgent ? userProfile?.name : userProfile?.businessName}
                surname={isAgent ? userProfile?.surname : ''}
                agent={isAgent}
              />
            ) : (
              <ProfileIncompleteCard
                name={isAgent ? userProfile?.name : userProfile?.businessName}
                surname={isAgent ? userProfile?.surname : ''}
                agent={isAgent}
              />
            )}

            {profileComplete ? <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={6}>
                {isAgent ? (
                  <AppWidgetSummary title="Available Vacancies" total={100} icon={'ant-design:pie-chart-filled'} />
                ) : (
                  <AppWidgetSummary title="Available Agents" total={100} icon={'ant-design:pie-chart-filled'} />
                )}
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                {isAgent ? (
                  <AppWidgetSummary
                    title="Your Active Applications"
                    total={0}
                    color="info"
                    icon={'ant-design:info-circle-filled'}
                  />
                ) : (
                  <AppWidgetSummary
                    title="Your Active Vacancies"
                    total={0}
                    color="info"
                    icon={'ant-design:info-circle-filled'}
                  />
                )}

              </Grid>
            </Grid> : <iframe src="https://www.youtube.com/embed/JbEDmtSzil0?si=aTtR5lEfTRFso7TB" title="intro_video" style={{ width: "100%", height: "700px", borderRadius: "20px", marginTop: 35, border: "none" }} />
            }

          </>
        )}
      </Container>
    </Page>
  );
}
