import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Page from '../../components/Page';
import PricingEditable from '../../components/PricingEditable';
import SubscriptionService from '../../services/SubscriptionService';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function SubscribtionDetails() {
  const _subscriptionService = new SubscriptionService();
  const [customerSubscription, setCustmerSubscription] = useState('');

  useEffect(() => {
    getSubscriptionDetails();
  }, []);

  const getSubscriptionDetails = async () => {
    const token = await sessionStorage.getItem('authToken');
    _subscriptionService
      .getSubscriptionDetails(token)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response.statusText;
      })
      .then((responseJson) => {
        console.log('GET-SUBSCRIPTION|RESPONSE', responseJson);
        setCustmerSubscription(responseJson);
      })
      .catch((error) => {
        console.log('GET-SUBSCRIPTION|ERROR', error);
        setCustmerSubscription(null);
      });
  };

  const curentPackage = {
    name: 'Basic',
  };

  return (
    <Page title="Subscription Details">
      {customerSubscription === '' ? <></> : <PricingEditable repMePackage={customerSubscription} />}
    </Page>
  );
}
