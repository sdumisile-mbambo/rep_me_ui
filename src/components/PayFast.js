import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';

export default function PayFast() {
  const payFastURL = 'https://sandbox.payfast.co.za/eng/process';
  const payFastMerchantId = '10014697';
  const payfastMerchant = 'y71abcqnba7wt';

  // ----- PROD VALUES -----
  const payFastUrlProd = 'https://www.payfast.co.za/eng/process';
  const payFastMerchantIdProd = '21891906';
  const payfastmMerchantKeyProd = 'nqk40awiu42rb';

  const notifyUrlProd = 'https://coa-api.co.za/coa/register/paymentsss';
  const notifyUrl = 'http://102.32.163.200:9090/create/subscription';

  const [payfastRequest, setPayfastRequest] = useState(null);

  useEffect(() => {
    const paymentData = {
      merchant_id: payFastMerchantId,
      merchant_key: payfastMerchant,
      amount: '100.00',
      m_payment_id: '123456',
      notify_url: notifyUrl,
      item_name: 'RepMe Subscription',
      item_description: 'Rep Me Sign Up',
      payment_method: 'cc',
    };
    console.log('payfast request', paymentData);
    setPayfastRequest(paymentData);
  }, []);

  const handleSubmit = (e) => {
    console.log(e);
  };

  return (
    <div>
      {payfastRequest == null ? (
        <></>
      ) : (
        <form action={payFastURL} method="POST" onSubmit={handleSubmit}>
          <input type="hidden" name="merchant_id" value={payfastRequest.merchant_id} />
          <input type="hidden" name="merchant_key" value={payfastRequest.merchant_key} />
          <input
            type="hidden"
            name="return_url"
            value="https://51ae-102-32-163-200.ngrok-free.app/home/subscription"
          />
          <input
            type="hidden"
            name="cancel_url"
            value="https://51ae-102-32-163-200.ngrok-free.app/home/subscription/failure"
          />
          <input type="hidden" name="notify_url" value={payfastRequest.notify_url} />
          <input type="hidden" name="m_payment_id" value={payfastRequest.m_payment_id} id="payment_id" />
          <input type="hidden" name="amount" value={payfastRequest.amount} id="amount" />
          <input type="hidden" name="item_name" value="Private Chef Booking" />
          <input type="hidden" name="item_description" value="Private Chef booking services" />
          <input type="hidden" name="payment_method" value="cc" />
          <Button fullWidth variant="contained" type="submit" target="_blank">
            Subcribe to Plan
          </Button>
        </form>
      )}
    </div>
  );
}
