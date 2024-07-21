import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

export default function PayFast({ selectedPackage }) {
  const payFastURL = 'https://sandbox.payfast.co.za/eng/process';
  const payFastMerchantId = '10014697';
  const payfastMerchant = 'y71abcqnba7wt';

  // ----- PROD VALUES -----
  const payFastUrlProd = 'https://www.payfast.co.za/eng/process';
  const payFastMerchantIdProd = '21891906';
  const payfastmMerchantKeyProd = 'nqk40awiu42rb';

  const notifyUrlProd = 'https://coa-api.co.za/coa/register/paymentsss';
  const notifyUrl = 'http://ec2-3-144-207-250.us-east-2.compute.amazonaws.com:8081/repme/register/subscription';
  const [payfastRequest, setPayfastRequest] = useState(null);

  useEffect(() => {
    const userJson = JSON.parse(sessionStorage.getItem('user'));
    const paymentData = {
      merchant_id: payFastMerchantId,
      merchant_key: payfastMerchant,
      amount: selectedPackage?.price,
      initial_amount: parseInt(selectedPackage?.price, 10) + parseInt(selectedPackage?.onceOffFee, 10),
      m_payment_id: '123456',
      notify_url: notifyUrl,
      item_name: selectedPackage?.title,
      item_description: `${selectedPackage?.title}`,
      payment_method: 'cc',
      billing_date: new Date().toISOString().slice(0, 10),
      name: userJson?.name,
      surname: userJson?.surname,
      email: userJson?.email,
    };
    console.log('payfast request', paymentData);
    setPayfastRequest(paymentData);
  }, []);

  const handleSubmit = (e) => {
    console.log(e);
  };


  const generateSignature =()=> {

  }

  return (
    <div>
      {payfastRequest == null ? (
        <CircularProgress />
      ) : (
        <form action={payFastURL} method="POST" onSubmit={handleSubmit}>
          <input type="hidden" name="merchant_id" value={payfastRequest.merchant_id} />
          <input type="hidden" name="merchant_key" value={payfastRequest.merchant_key} />
          <input type="hidden" name="return_url" value="https://5ea1-102-33-32-47.ngrok-free.app/home/subscription" />
          <input type="hidden" name="notify_url" value="https://3b0c-102-33-32-53.ngrok-free.app/repme/register/subscription" />
          <input
            type="hidden"
            name="cancel_url"
            value="https://5ea1-102-33-32-47.ngrok-free.app/home/subscription/failure"
          />
          <input type="hidden" name="m_payment_id" value={payfastRequest.m_payment_id} id="123456" />
          <input type="hidden" name="amount" value={payfastRequest.initial_amount} id="amount" />
          <input type="hidden" name="recurring_amount" value={payfastRequest.amount} id="recurring_amount" />
          <input type="hidden" name="custom_str1" value={payfastRequest.amount} id="custom_str1" />
          <input type="hidden" name="initial_amount" value={payfastRequest.amount} id="initial_amount" />
          <input type="hidden" name="item_name" value={payfastRequest.item_name} />
          <input type="hidden" name="item_description" value={payfastRequest.item_description} />
          <input type="hidden" name="payment_method" value="cc" />
          <input type="hidden" name="email_address" value={payfastRequest.email} />
          <input type="hidden" name="name_first" value={payfastRequest.name} />
          <input type="hidden" name="name_last" value={payfastRequest.surname} />
          <input type="hidden" name="billing_date" value={payfastRequest.billing_date} />
          <input type="hidden" name="frequency" value="3" />
          <input type="hidden" name="cycles" value="0" />
          <input type="hidden" name="subscription_type" value="1" />
          <Button fullWidth variant="contained" type="submit" target="_blank">
            Subcribe to Plan
          </Button>
        </form>
      )}
    </div>
  );
}
