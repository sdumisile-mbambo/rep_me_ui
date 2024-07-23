/* eslint-disable jsx-a11y/media-has-caption */
import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

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
              <Typography
                component="span"
                variant="h1"
                sx={{
                  color: (theme) => (theme.palette.mode === 'light' ? 'primary.main' : 'primary.light'),
                  marginLeft: 2,
                }}
              >
                RepMe,
              </Typography>
              <Typography component="span" variant="h1">
                The way to
                get work done.
              </Typography>
            </Stack>
            <Stack spacing={2} direction="row" sx={{ width: '50%', marginTop: 6 }}>
              <Button
                fullWidth
                variant="contained"
                endIcon={<ArrowRightAltIcon />}
              >
                Hire Agents
              </Button>
              <Button
                fullWidth
                variant="outlined"
                endIcon={<ArrowRightAltIcon />}

              >
                Find Work
              </Button>
            </Stack>

            <Typography color="text.secondary" sx={{ marginTop: 5 }}>
              Take control of your staffing. Get qualified people on demand. Low cost, no contracts, no minimums, no risk.
            </Typography>
          </Grid>

          <Grid item xs={4}>
            <img src="/static/illustrations/working.png" alt="login" />
          </Grid>
        </Grid>
        <iframe src="https://www.youtube.com/embed/JbEDmtSzil0?si=aTtR5lEfTRFso7TB" title="intro_video" style={{ width: "80%", height: "700px", borderRadius: "20px", marginTop: 35, border: "none" }} />

      </ContainerStyled>
    </Box>
  );
}
