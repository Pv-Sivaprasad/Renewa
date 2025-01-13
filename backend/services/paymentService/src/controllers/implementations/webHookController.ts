// import { WebHook } from "../interface/webHookControllerInterface";
import Stripe from "stripe";
import { Request,Response,NextFunction } from "express";
import { HttpStatus } from "../../enums/httpStatus";
import { IPaymentService } from "../../services/interface/IPaymentService";
import { IWebHookServices } from "../../services/interface/IWebHookService";



let stripe=new Stripe(process.env.STRIPE_SECRET_KEY!,{ apiVersion: '2024-12-18.acacia'})




export class WebHookController  {

    constructor(private webHookService: IWebHookServices) { }


    async webHookHandle(req:Request,res:Response){
        console.log('inside the webHook controller');
        
        let event;

        const signature=req.headers['stripe-signature'] as string
        console.log('the signarire is ******',signature);

        if(!signature){
             res.status(HttpStatus.BAD_REQUEST).send('Webhook Error: Missing signature or secret')
             return
        }


        try {
            console.log(process.env.STRIPE_WEBHOOK_SECRET,'process.env.STRIPE_WEBHOOK_SECRET');
            event=stripe.webhooks.constructEvent(req.body,signature,process.env.STRIPE_WEBHOOK_SECRET!)

            if(event){
                console.log('the event is working');
                
                await this.webHookService.webhookHandleSave(event)
                res.json({received:true})
            }
            
        } catch (error) {
            console.error('Error in webhook signature verification:', error);
        }

        
    }


}

export default WebHookController