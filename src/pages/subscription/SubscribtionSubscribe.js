import React from 'react';
import {  useLocation } from 'react-router-dom';

// components
import Page from '../../components/Page';
import SubscribeCard from '../../components/SubscribeCard';
// ----------------------------------------------------------------------

export default function SubscribtionSubscribe() {
  const location = useLocation();
  const selectedPackage = location.state;
  return (
    <Page title="Select Plan">
          <SubscribeCard selectedPackage={selectedPackage}/>
    </Page>
  );
}
