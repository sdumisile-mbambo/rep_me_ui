import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { useNavigate } from 'react-router-dom';

const userTiers = [
  {
    title: 'Classic Package',
    price: '249',
    onceOffFee: '250', 
    description: [
      'Includes a 3 part sales course and certificate - compulsory',
      '5 matches a month to choose from',
      'Includes full access to new work opportunities across SA',
      'Includes an automated matching to businesses looking for short term employees or medium term employees',
      'Gives the opportunity to travel to different provinces and cities in SA, work and earn on short term or medium term',
      'Give experiences in many different industries as you work on short or medium term contracts',
      'You are not tied in to a job that you are not passionate about due to short or medium term contracts',
      'Thousands of opportunities available every month',
      'Unsubscribe at anytime with no cancellation fee',
      '10 days free trial'
    ],
    buttonText: 'Start now',
    buttonVariant: 'outlined',
  },
  {
    title: 'Plus Package',
    subheader: 'Recommended',
    price: '499',
    onceOffFee: '250', 
    description: [
      'Includes a 3 part sales course and certificate - compulsory',
      '15 matches a month to choose from',
      'Includes full access to new work opportunities across SA',
      'Includes an automated matching to businesses looking for short term employees or medium term employees',
      'Gives the opportunity to travel to different provinces and cities in SA, work and earn on short term or medium term',
      'Give experiences in many different industries as you work on short or medium term contracts',
      'You are not tied in to a job that you are not passionate about due to short or medium term contracts',
      'Thousands of opportunities available every month',
      'Unsubscribe at anytime with no cancellation fee',
      '10 days free trial'
    ],
    buttonText: 'Start now',
    buttonVariant: 'contained',
  },
  {
    title: 'Pro Package',
    price: '799',
    onceOffFee: '250', 
    description: [
      'Includes a 3 part sales course and certificate - compulsory',
      '50 matches a month to choose from',
      'Includes full access to new work opportunities across SA',
      'Includes an automated matching to businesses looking for short term employees or medium term employees',
      'Gives the opportunity to travel to different provinces and cities in SA, work and earn on short term or medium term',
      'Give experiences in many different industries as you work on short or medium term contracts',
      'You are not tied in to a job that you are not passionate about due to short or medium term contracts',
      'Thousands of opportunities available every month',
      'Unsubscribe at anytime with no cancellation fee',
      '10 days free trial'
    ],
    buttonText: 'Start now',
    buttonVariant: 'outlined',
  },
];

const businessTiers = [
  {
    title: 'Classic',
    price: '999',
    onceOffFee: '499', 
    description: [
      '5 matches a month to choose from',
      'Access to thousands of reps and sales experts looking to help companies on short term contracts',
      'Automated matching algorithm to match your ideal candidates for your opportunity',
      'Short notice hiring of quality sales people',
      'Access to pre-qualified and vetted sales people that completed our in house sales training',
      'Access to reps who is actively looking for short term or medium term opportunities from all over SA',
      'Your next permanent sales superstar might be in our sales person pool',
      'Ability to hire short terms sales people to help boost a bad month',
      'Do not have to commit to a long term contract for a sales person who might not be passionate about your business',
      'Give experience to sales people in your particular industry whilst they get to make you money',
      'Hire fast with quick with an easy hiring process to get your new sales people on the phone or on the road as quick as possible',
      'Full support from qualified staff on registering, hiring or anything else',
      'Unsubscribe at anytime with no cancellation fee',
      '10 days free trial'
    ],
    buttonText: 'Start now',
    buttonVariant: 'outlined',
  },
  {
    title: 'Plus Package',
    subheader: 'Recommended',
    price: '1499',
    onceOffFee: '499', 
    description: [
      '20 matches a month to choose from',
      'Access to thousands of reps and sales experts looking to help companies on short term contracts',
      'Automated matching algorithm to match your ideal candidates for your opportunity',
      'Short notice hiring of quality sales people',
      'Access to pre-qualified and vetted sales people that completed our in house sales training',
      'Access to reps who is actively looking for short term or medium term opportunities from all over SA',
      'Your next permanent sales superstar might be in our sales person pool',
      'Ability to hire short terms sales people to help boost a bad month',
      'Do not have to commit to a long term contract for a sales person who might not be passionate about your business',
      'Give experience to sales people in your particular industry whilst they get to make you money',
      'Hire fast with quick with an easy hiring process to get your new sales people on the phone or on the road as quick as possible',
      'Full support from qualified staff on registering, hiring or anything else',
      'Unsubscribe at anytime with no cancellation fee',
      '10 days free trial'
    ],
    buttonText: 'Start now',
    buttonVariant: 'contained',
  },
  {
    title: 'Pro Package',
    price: '1999',
    onceOffFee: '499', 
    description: [
      '50 matches a month to choose from',
      'Access to thousands of reps and sales experts looking to help companies on short term contracts',
      'Automated matching algorithm to match your ideal candidates for your opportunity',
      'Short notice hiring of quality sales people',
      'Access to pre-qualified and vetted sales people that completed our in house sales training',
      'Access to reps who is actively looking for short term or medium term opportunities from all over SA',
      'Your next permanent sales superstar might be in our sales person pool',
      'Ability to hire short terms sales people to help boost a bad month',
      'Do not have to commit to a long term contract for a sales person who might not be passionate about your business',
      'Give experience to sales people in your particular industry whilst they get to make you money',
      'Hire fast with quick with an easy hiring process to get your new sales people on the phone or on the road as quick as possible',
      'Full support from qualified staff on registering, hiring or anything else',
      'Unsubscribe at anytime with no cancellation fee',
      '10 days free trial'
    ],
    buttonText: 'Start now',
    buttonVariant: 'outlined',
  },
];

function PricingEditable({ repMePackage }) {
  const navigate = useNavigate();
  const [user, setUser] = React.useState(JSON.parse(sessionStorage.getItem('user')));
  const [tiers, setTiers] = React.useState([]);

  const handleSubscriptionClicked = (packageName) => {

    console.log(getSelectedpackage(packageName));
    if (repMePackage === null || repMePackage === undefined) {
      // handle brand nw subscription.
      // go to payfast  brand new subscription.
      navigate('/home/subscription/subscribe', { replace: false, state: getSelectedpackage(packageName) });
    } else {
      // handle subscription update.
      // go to upgrade plan page.
      navigate('/home/subscription/update-plan', { replace: false, state: getSelectedpackage(packageName) });
    }
  };

  const getSelectedpackage = (name) => tiers.find(({ title }) => title === name);

  React.useEffect(() => {
    console.log('use effect', user)

    if (user) {
      if (user.role === "2") {
        setTiers(businessTiers);
      } else {
        setTiers(userTiers);
      }
    }

  }, [user])

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
          RepMe Pricing
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />
          Nulla sollicitudin sapien sem, eget fringilla diam ultrices sit amet.
        </Typography>
      </Box>
      <Grid container spacing={3} alignItems="center" justifyContent="center">
        {tiers.map((tier) => (
          <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
            <Card
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                border: '1px solid',
                borderColor: 'primary.main',
                background: tier.title === 'Plus Package' ? 'linear-gradient(#F9A826, #949485)' : undefined,
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    mb: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: tier.title === 'Plus Package' ? 'grey.100' : '',
                  }}
                >
                  <Typography component="h3" variant="h6">
                    {tier.title}
                  </Typography>
                  {tier.title === 'Plus Package' && (
                    <Chip
                      icon={<AutoAwesomeIcon />}
                      label={tier.subheader}
                      size="small"
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
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'baseline',
                    color: tier.title === 'Plus Package' ? 'grey.50' : undefined,
                  }}
                >
                  <Typography component="h3" variant="h2">
                    R{tier.price}
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
                {tier.description.map((line) => (
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
                        color: tier.title === 'Plus Package' ? 'primary.light' : 'primary.main',
                      }}
                    />
                    <Typography
                      component="text"
                      variant="subtitle2"
                      sx={{
                        color: tier.title === 'Plus Package' ? 'grey.200' : undefined,
                      }}
                    >
                      {line}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
              <CardActions>
                {repMePackage?.subscriptionPackage === tier.title ? (
                  <Button fullWidth variant={tier.buttonVariant} component="a" onClick={() => { handleSubscriptionClicked(tier.title) }} disabled>
                    This is your current plan.
                  </Button>
                ) : (
                  <Button fullWidth variant={tier.buttonVariant} component="a" onClick={() => { handleSubscriptionClicked(tier.title) }}>
                    {tier.buttonText}
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

PricingEditable.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  repMePackage: PropTypes.object,
};

export default PricingEditable;
