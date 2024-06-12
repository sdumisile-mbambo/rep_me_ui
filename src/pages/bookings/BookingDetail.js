import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';

import { Card, Grid, Avatar, CardContent, Typography, Container, Stack, Button } from '@mui/material';
import * as Yup from 'yup';
import { useState } from 'react';
import { useLocation, useNavigate, Link as RouterLink } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import moment from 'moment'
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../components/Iconify';
import { FormProvider, RHFTextField } from '../../components/hook-form';
// ----------------------------------------------------------------------

const TitleStyle = styled('div')({
  minHeight: 50,
  fontsize: 23,
});

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  width: 182,
  height: 182,
  margin: 20,
}));

// ----------------------------------------------------------------------
export default function BookingDetail(props) {
  console.log(props);
  const locationVariable = useLocation();
  const { booking } = locationVariable.state;
  console.log(booking);
  const {
    id,
    chefProfile,
    bookingCost,
    bookingDate,
    bookingPackage,
    clientInfoDto,
    numberOfGuests,
    location,
    cuisine,
    menu,
  } = booking;
  const navigate = useNavigate();

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Booking Details
        </Typography>
        <Button
          variant="contained"
          component={RouterLink}
          to="/dashboard/bookings"
          startIcon={<Iconify icon="eva:arrow-back-outline" />}
        >
          Back
        </Button>
      </Stack>
      <Grid item xs={8} sm={8} md={5}>
        <Card sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
          <CardContent style={{ width: '100%' }}>
            <Grid container spacing={2}>
              <Grid item xs={6} md={6}>
                <Typography variant="subtitle2" gutterBottomvariant="subtitle2" gutterBottom>
                  Date
                </Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography>{moment(new Date(bookingDate)).format('dddd, MMMM Do YYYY')}</Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography variant="subtitle2" gutterBottomvariant="subtitle2" gutterBottom>
                  Package
                </Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography>{bookingPackage}</Typography>
              </Grid>

              <Grid item xs={6} md={6}>
                <Typography variant="subtitle2" gutterBottomvariant="subtitle2" gutterBottom>
                  Price
                </Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography>{bookingCost}</Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography variant="subtitle2" gutterBottomvariant="subtitle2" gutterBottom>
                  Allocated Chef
                </Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography>{`${chefProfile?.name} ${chefProfile?.surname}`}</Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography variant="subtitle2" gutterBottomvariant="subtitle2" gutterBottom>
                  Guests
                </Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography>{numberOfGuests}</Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography variant="subtitle2" gutterBottomvariant="subtitle2" gutterBottom>
                  Address
                </Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography>{location}</Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography variant="subtitle2" gutterBottomvariant="subtitle2" gutterBottom>
                  Client Name
                </Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography>{`${clientInfoDto?.name} ${clientInfoDto?.surname}`}</Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography variant="subtitle2" gutterBottomvariant="subtitle2" gutterBottom>
                  Client Email
                </Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography>{clientInfoDto?.email}</Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography variant="subtitle2" gutterBottomvariant="subtitle2" gutterBottom>
                  Cuisine
                </Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography>{cuisine?.name}</Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography variant="subtitle2" gutterBottomvariant="subtitle2" gutterBottom>
                  Menu
                </Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography>{menu?.name}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Container>
  );
}
