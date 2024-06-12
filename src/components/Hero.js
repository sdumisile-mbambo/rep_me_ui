import * as React from 'react';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const ContainerStyled = styled(Box)(({ theme }) => ({
  maxWidth: 1600,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: theme.spacing(2, 0, 2, 0),
  pt: { xs: 14, sm: 20 },
  pb: { xs: 8, sm: 12 },
  paddingLeft: 80,
  paddingRight: 50,
}));

export default function Hero() {
  return (
    <Box
      id="hero"
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 5 }}
    >
      <ContainerStyled>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Stack spacing={2}>
              <Typography component="span" variant="h1">
                Launch into the future with,
              </Typography>

              <Typography
                component="span"
                variant="h1"
                sx={{
                  color: (theme) => (theme.palette.mode === 'light' ? 'primary.main' : 'primary.light'),
                  marginLeft: 2,
                }}
              >
                RepMe
              </Typography>
            </Stack>

            <Typography color="text.secondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas feugiat vestibulum velit a elementum.
              Quisque euismod tortor eget pretium tincidunt
            </Typography>
          </Grid>

          <Grid item xs={4}>
            <img src="/static/illustrations/working.png" alt="login" />
          </Grid>
        </Grid>
        <Box
          id="image"
          sx={(theme) => ({
            mt: { xs: 8, sm: 10 },
            alignSelf: 'center',
            height: { xs: 200, sm: 700 },
            width: '80%',
            backgroundImage:
              theme.palette.mode === 'light'
                ? 'url("/static/illustrations/app_demo_2.png")'
                : 'url("/static/illustrations/app_demo_2.png")',
            backgroundSize: 'cover',
            borderRadius: '10px',
            outline: '1px solid',
            outlineColor: theme.palette.mode === 'light' ? alpha('#BFCCD9', 0.5) : alpha('#9CCCFC', 0.1),
            boxShadow:
              theme.palette.mode === 'light'
                ? `0 0 12px 8px ${alpha('#9CCCFC', 0.2)}`
                : `0 0 24px 12px ${alpha('#033363', 0.2)}`,
          })}
        />
      </ContainerStyled>
    </Box>
  );
}
