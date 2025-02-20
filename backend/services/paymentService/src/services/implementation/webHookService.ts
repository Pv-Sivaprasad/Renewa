import Stripe from "stripe";
import { IPayment } from "../../models/paymentModel";
import { IPaymentService } from "../interface/IPaymentService";
import { IWebHookServices } from "../interface/IWebHookService";



export class IWebHookService implements IWebHookServices{


async webhookHandleSave(event: Stripe.Event): Promise<null> {
      try {
        console.log('inside the payment service');
        

        if(event.type='payment_intent.succeeded'){
          const paymentIntent=event.data.object
          console.log('te payment intent is ',paymentIntent);
          
           try {
            // let result = await IPayment
           } catch (error) {
            
           }

            // const response=await this.paymentRepository.findOneAndUpdate(session.id)
        }
       
        

        return null
      } catch (error) {
        return null
      }
    }
}