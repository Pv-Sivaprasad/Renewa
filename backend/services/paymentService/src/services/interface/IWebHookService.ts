import Stripe from "stripe";

export interface IWebHookServices{


    
    webhookHandleSave(event: Stripe.Event): Promise<null>;
}