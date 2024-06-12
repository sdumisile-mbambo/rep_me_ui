import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';
// components
import Page from '../components/Page';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function ChefSetUpComplete() {
  return (
    <Page title="All Done!">
      <Container>
        <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
            All Done!
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            To continue on the App, Go to the Google Playstore on Android, or the App Store on ios, search 'RepMe', download the app, and join our exciting journey!
          </Typography>

          <img alt="register" src="/static/illustrations/cooking.png" />

          {/* <Button to="/" size="large" variant="contained" component={RouterLink}>
            Go to Home
          </Button> */}
        </ContentStyle>
      </Container>
    </Page>
  );
}
