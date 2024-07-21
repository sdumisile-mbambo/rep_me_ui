import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import Stack from '@mui/material/Stack';
import MerchantCard from './MerchantCard';
import PayFast from './PayFast';
import SubscriptionService from '../services/SubscriptionService';
import FeedBackModal from './FeedBackModal';

function SubscribeCard({ selectedPackage, update }) {
  console.log(selectedPackage);

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [header, setHeader]= useState("");
  const [body, setBody]= useState("");
  const [isBusy, setIsBusy] = useState(false);

  const _subscriptionService = new SubscriptionService();

  const handleClose=()=>{
    setOpen(false);
    navigate('/home/subscription', { replace: false });
  }


  const updatePlan =async()=>{
    setIsBusy(true);
    const token = await sessionStorage.getItem('authToken');

    const updatePlanRequest = {
      "amount": parseInt(selectedPackage?.price,10),
      "cycles": "0",
      "frequency":3,
      "runDate": new Date().toDateString(),
      "subscriptionPackage": selectedPackage?.title
    }

    _subscriptionService
    .updateSubscriptionDetails(token, updatePlanRequest)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.body); 
    })
    .then((responseJson) => {
      setHeader("Subscription Update");
      setBody("Your subscription details have been updated successfully.");
      setOpen(true);
      setIsBusy(false);
    })
    .catch((error) => {
      setHeader("Subscription Update");
      setBody("We were unable to update your subscription at this moment. Please try again later.");
      setOpen(true);
      console.log('UPDATE-SUBSCRIPTION|ERROR', error);
      setIsBusy(false);
    });

  }




  return (
    <Container
      id="pricing"
      sx={{
        pt: { xs: 4, sm: 12, md: 0, lg: 0, xl: 0 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
        bgcolor: '#fffff',
      }}
    >
      <Box
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        <Typography component="h2" variant="h4" color="text.primary">
          Subcribe to RepMe
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Quickly build an effective pricing table for your potential customers with this layout.
        </Typography>
      </Box>

      <Stack direction="row" spacing={2}>
        <Card
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          <CardContent>
            <Box
              sx={{
                mb: 1,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography component="h3" variant="h6">
                {selectedPackage.title}
              </Typography>
              {selectedPackage.title === 'Professional' && (
                <Chip
                  icon={<AutoAwesomeIcon />}
                  label={selectedPackage.subheader}
                  size="small"
                  color="primary"
                  variant="outlined"
                  sx={{
                    background: (theme) => (theme.palette.mode === 'light' ? '' : 'none'),
                    backgroundColor: 'primary.contrastText',
                    '& .MuiChip-label': {
                      color: 'primary.dark',
                    },
                    '& .MuiChip-icon': {
                      color: 'primary.dark',
                    },
                  }}
                />
              )}
            </Box>

            <Typography variant="body1" color="text.secondary">
             {`Subscribe to RepMe today! Includes a once off sign up fee of : ${selectedPackage.onceOffFee}`}
            </Typography>
            <Divider
              sx={{
                my: 2,
                opacity: 0.2,
                borderColor: 'grey.500',
              }}
            />
            {selectedPackage.description.map((line) => (
              <Box
                key={line}
                sx={{
                  py: 1,
                  display: 'flex',
                  gap: 1.5,
                  alignItems: 'center',
                }}
              >
                <CheckCircleRoundedIcon
                  sx={{
                    width: 20,
                    color: 'primary.main',
                  }}
                />
                <Typography component="text" variant="subtitle2">
                  {line}
                </Typography>
              </Box>
            ))}
          </CardContent>
        </Card>

        <Card
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            overflow: 'visible'
          }}
        >
          <CardContent>
            <Box
              sx={{
                mb: 0,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography component="h3" variant="h2">
                R{selectedPackage.price}
              </Typography>
              <Typography component="h3" variant="h6">
                &nbsp; per month
              </Typography>
            </Box>
            <Divider
              sx={{
                my: 2,
                opacity: 0.2,
                borderColor: 'grey.500',
              }}
            />
            <Typography variant="body1" color="text.secondary">
              Subscirbe securely with PayFast.
            </Typography>
            <MerchantCard />
          </CardContent>

          <CardActions>
            {update ? <Button fullWidth variant='contained' component="a" onClick={updatePlan}>
              Change Plan
            </Button> : <PayFast selectedPackage={selectedPackage} />}
          </CardActions>
        </Card>
        <FeedBackModal   handleClose={handleClose} open={open} header={header} body={body}/>
      </Stack>
    </Container>
  );
}

SubscribeCard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  selectedPackage: PropTypes.func,
};

export default SubscribeCard;
