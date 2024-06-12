// @mui
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
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

ProfileIncompleteCard.propTypes = {
  color: PropTypes.string,
  agent: PropTypes.string,
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  sx: PropTypes.object,
};

export default function ProfileIncompleteCard({ name, surname, agent, color = 'primary', sx, ...other }) {
  const navigate = useNavigate();

  const handleButtonClck = () => {
    navigate('/home/profile', { replace: false });
  };
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
              {`Hi, Welcome back, ${name}!`}
            </Typography>
          )}

          {agent ? (
            <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
              Complete your profile to be better postioned to find your future job!
            </Typography>
          ) : (
            <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
              Complete your profile to be better postioned to find your next agent!
            </Typography>
          )}

          <Grid item xs={8}>
            <Button variant="contained" sx={{ marginTop: 3 }} onClick={handleButtonClck}>
              Complete Profile
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
