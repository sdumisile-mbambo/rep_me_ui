
import * as React from 'react';
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

const tiers = [
  {
    title: 'Classic',
    price: '249',
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

export default function Pricing() {
  return (
    <Container
      id="pricing"
      sx={{
        pt: { xs: 4, sm: 12 },
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
          Pricing
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Quickly build an effective pricing table for your potential customers with
          this layout. <br />
          It&apos;s built with default Material UI components with little
          customization.
        </Typography>
      </Box>
      <Grid container spacing={3} alignItems="center" justifyContent="center">
        {tiers.map((tier) => (
          <Grid
            item
            key={tier.title}
            xs={12}
            sm={tier.title === 'Enterprise' ? 12 : 6}
            md={4}
          >
            <Card
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                border: tier.title === 'Professional' ? '1px solid' : undefined,
                borderColor:
                  tier.title === 'Professional' ? 'primary.main' : undefined,
                background:
                  tier.title === 'Professional'
                    ? 'linear-gradient(#F9A826, #f1f1f0)'
                    : undefined,
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    mb: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: tier.title === 'Professional' ? 'grey.100' : '',
                  }}
                >
                  <Typography component="h3" variant="h6">
                    {tier.title}
                  </Typography>
                  {tier.title === 'Professional' && (
                    <Chip
                      icon={<AutoAwesomeIcon />}
                      label={tier.subheader}
                      size="small"
                      sx={{
                        background: (theme) =>
                          theme.palette.mode === 'light' ? '' : 'none',
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
                    color: tier.title === 'Professional' ? 'grey.50' : undefined,
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
                        color:
                          tier.title === 'Professional'
                            ? 'primary.light'
                            : 'primary.main',
                      }}
                    />
                    <Typography
                      component="text"
                      variant="subtitle2"
                      sx={{
                        color:
                          tier.title === 'Professional' ? 'grey.200' : undefined,
                      }}
                    >
                      {line}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant={tier.buttonVariant}
                  component="a"
                  href="/material-ui/getting-started/templates/checkout/"
                  target="_blank"
                >
                  {tier.buttonText}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
