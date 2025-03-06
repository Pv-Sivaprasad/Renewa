// import { WebHook } from "../interface/webHookControllerInterface";
import Stripe from "stripe";
import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../../enums/httpStatus";
import { IPaymentService } from "../../services/interface/IPaymentService";
import { IWebHookServices } from "../../services/interface/IWebHookService";
import { WebHookService } from "../../services/implementation/webHookService";


let stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-12-18.acacia' })




export class WebHookController {

    webHookService: WebHookService;

    constructor() {
        this.webHookService = new WebHookService();
        this.webHookHandle = this.webHookHandle.bind(this);
    }

    // constructor(private readonly webHookService: IWebHookServices) { }


    async webHookHandle(req: Request, res: Response) {
        // console.log('inside the webHook controller');

        let event;

        const signature = req.headers['stripe-signature'] as string
        // console.log('the signarire is ******',signature);

        if (!signature) {
            res.status(HttpStatus.BAD_REQUEST).send('Webhook Error: Missing signature or secret')
            return
        }


        try {
            // console.log(process.env.STRIPE_WEBHOOK_SECRET, 'process.env.STRIPE_WEBHOOK_SECRET');
            event = stripe.webhooks.constructEvent(
                req.body,
                signature,
                process.env.STRIPE_WEBHOOK_SECRET!
            )
            // console.log('the event is *///////////*/*/*',event );

            if (event) {
                console.log('the event is working');

                let data = await this.webHookService.webhookHandleSave(event)
                // await this.webService.webhookHandleSave(event)
                res.json({ received: true })
            }

        } catch (error) {
            console.error('Error in webhook signature verification:', error);
            res.status(HttpStatus.BAD_REQUEST).json({
                error: 'Webhook signature verification failed'
            });
            return;
        }


    }


}

export default WebHookController