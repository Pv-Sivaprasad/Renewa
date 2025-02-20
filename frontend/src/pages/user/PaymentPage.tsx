import React from 'react'
import Checkout from '../../components/user/payment'
import { useLocation } from 'react-router'


const PaymentPage = () => {

  const location= useLocation()
  const payload=location.state.clientSecret 
console.log('the client secret is',payload);

  return (
    <div>
        
      <Checkout clientSecret={payload}/>
    </div>
  )
}

export default PaymentPage
