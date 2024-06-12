// @mui
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
// components

// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

ProfileCompleteCard.propTypes = {
  color: PropTypes.string,
  agent: PropTypes.string,
  name: PropTypes.string.isRequired,
  surname: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

export default function ProfileCompleteCard({ name, surname, agent, color = 'primary', sx, ...other }) {
  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        color: (theme) => theme.palette[color].darker,
        bgcolor: '#f4e7ca',
        ...sx,
        marginBottom: 5,
        minHeight: 160,
        height: 190,
        padding: 5,
      }}
      {...other}
    >
      <Grid container spacing={1} sx={{ height: 190 }}>
        <Grid item xs={8}>
          {agent ? (
            <Typography variant="h4" sx={{ mb: 1 }}>
              {`Hi, Welcome back, ${name} ${surname}!`}
            </Typography>
          ) : (
            <Typography variant="h4" sx={{ mb: 1 }}>
              {`Hi, Welcome back, ${name} `}
            </Typography>
          )}

          <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
            Proin vehicula nunc ut pretium mattis. Nam eu lacus nunc. Phasellus porta cursus augue, ultricies ultricies
            ipsum.
          </Typography>
          <Grid item xs={8}>
            <Button variant="contained" sx={{ marginTop: 3 }}>
              {agent ? 'View Vacancies' : 'Create Vacancies'}
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <img src="/static/illustrations/profile.png" alt="login" style={{ height: '45%' }} />
        </Grid>
      </Grid>
    </Card>
  );
}
