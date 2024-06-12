import { Link as RouterLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
// material
import { Grid, Button, Container, Stack, Typography, Paper } from '@mui/material';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import AdminService from '../../services/AdminService';
import PackageCard from '../../sections/@dashboard/blog/PackageCard';
import LoadSkeletonGrid from '../../components/LoadSkeletonGrid';

export default function Packages() {
  const _adminService = new AdminService();
  const [packages, setPackages] = useState([]);
  const [isBusy, setIsBusy] = useState(true);

  useEffect(() => {
    async function fecthChefs() {
      setIsBusy(true);
      const token = await sessionStorage.getItem('authToken');
      _adminService
        .getPackageList(token)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((responseJson) => {
          console.log('GET-CHEFS-RESPONSE-JSON|RESPONSE', responseJson);
          if (responseJson != null) {
            setPackages(responseJson);
          }
          setIsBusy(false);
        })
        .catch((error) => {
          console.log('GET-CHEFS-CATCH-ERROR|ERROR', error);
          setIsBusy(false);
        });
    }

    fecthChefs();
  }, []);

  return (
    <Page title="Dashboard: Blog">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Packages
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/add/cuisine"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Package
          </Button>
        </Stack>

        {isBusy ? (
          <LoadSkeletonGrid />
        ) : (
          <>
            {packages.length === 0 ? (
              <Paper
                sx={{
                  height: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography gutterBottom align="center" variant="subtitle1">
                  Not packages Found
                </Typography>
                <Typography variant="body2" align="center">
                  There are currently no packages. Click &nbsp;
                  <strong>&quot; + New Package&quot;</strong> to add a new package.
                </Typography>
              </Paper>
            ) : (
              <Grid container spacing={3}>
                {packages.map((item) => (
                  <PackageCard key={item.id} cuisine={item} />
                ))}
              </Grid>
            )}
          </>
        )}
      </Container>
    </Page>
  );
}
