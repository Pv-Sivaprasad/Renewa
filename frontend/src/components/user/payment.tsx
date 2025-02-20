import React, { useCallback, useState, useEffect } from "react";
import {loadStripe} from '@stripe/stripe-js';
import {EmbeddedCheckoutProvider,EmbeddedCheckout} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

interface CheckoutProps {
  clientSecret: string;
}

const Checkout:React.FC<CheckoutProps> = ({clientSecret}) => {
  console.log('reached in this page');
  console.log(stripePromise,'asdfssdfsadfasdfsadfasf');
  
    console.log(clientSecret,'aksjdkfhsdf');
    console.log('type',typeof clientSecret);
    
    
    if (!clientSecret || typeof clientSecret !== "string") {
      return <div>Error: Invalid Client Secret. Please try again.</div>;
    }

   
  // const fetchClientSecret = useCallback(() => {
  //   // Create a Checkout Session
  //   return fetch("/create-checkout-session", {
  //     method: "POST",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => data.clientSecret);
  // }, []);

  // const options = {fetchClientSecret};
  const options =  {clientSecret} ;
  console.log(options,'___________________');
  
  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={options}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}

 export default Checkout


// import { useCallback } from "react";
// import {loadStripe} from '@stripe/stripe-js';
// import { slotPayment } from "../../services/user/userApi";
// import {
//   EmbeddedCheckoutProvider,
//   EmbeddedCheckout
// } from '@stripe/react-stripe-js';
// const stripePromise = loadStripe("pk_test_51QZX0JRtXYYCrCjCiXWWH8l93iNBtgUuJbcPMnRyL3Zfwah7gl6U4HrJTGFzHRXvxNZtA8buzexQieA0E6TTnZAV00bcSD94cm");

// //  const Checkout = ({payload}) => {
// //   const fetchClientSecret = useCallback(() => {
// //     // Create a Checkout Session
// //     return fetch("http://localhost:4001/user/payment-intent", {
// //       method: "POST",
// //       body:JSON.stringify(payload)
// //     })
// //       .then((res) => res.json())
// //       .then((data) => data.clientSecret);
// //   }, []);

//   // const options = {fetchClientSecret};

// const Checkout= ({ payload }) => {
//   const fetchClientSecret = useCallback(async () => {
//     try {
//       const response = await slotPayment(payload)
//       console.log('the response in payment is',response);
      
//       return response.data.clientSecret;
//     } catch (error) {
//       console.error('Error fetching client secret:', error);
//       throw error; // Handle errors as needed
//     }
//   }, [payload]);

//   const options = { fetchClientSecret };

//   return (
//     <div id="checkout">
//       <EmbeddedCheckoutProvider
//         stripe={stripePromise}
//         options={options}
//       >
//         <EmbeddedCheckout />
//       </EmbeddedCheckoutProvider>
//     </div>
//   )
// }

// export default Checkout