import React from 'react';
import { useLocation } from 'react-router-dom';
// components
import Page from '../../components/Page';
import SubscribeCard from '../../components/SubscribeCard';

// ----------------------------------------------------------------------

export default function SubscribtionUpdate() {
  const location = useLocation();
  const selectedPackage = location.state;

  return (
    <Page title="Change Plan">
          <SubscribeCard selectedPackage={selectedPackage}/>
    </Page>
  );
}
