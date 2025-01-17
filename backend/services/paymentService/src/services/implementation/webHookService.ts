import Stripe from "stripe";
import { IPayment } from "../../models/paymentModel";
import { IPaymentService } from "../interface/IPaymentService";
import { IWebHookServices } from "../interface/IWebHookService";
import { DocSlotRepository } from "../../repositories/implementation/DocSlotRepository";
import { PaymentDataDto } from "../../dto/paymentDto";

export class WebHookService implements IWebHookServices {

  private docSlotRepository: DocSlotRepository
  constructor() {
    this.docSlotRepository = new DocSlotRepository()
  }

  async webhookHandleSave(event: Stripe.Event): Promise<null> {
    try {
      console.log('inside the payment service');


      if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session

        console.log('Checkout Session Completed:', session);

        console.log('Session metadata:', session.metadata);
        console.log('Full session object:', JSON.stringify(session, null, 2));

        if (!session.metadata) {
          console.log('Warning: Session metadata is null or undefined');
          return null;
        }

        const { docId, startTime, date, userId } = session.metadata || {};
        if (!docId || !startTime || !date || !userId) {
          throw new Error('Missing metadata in checkout session');
        }

        console.log('Extracted metadata:', { docId, startTime, date, userId });

        try {
          const docSlot = await this.docSlotRepository.findSlot(docId);
          console.log('Doc Slot found:', JSON.stringify(docSlot, null, 2));
         
          const slotDate = docSlot?.dates.find(d => d.date === date);
          if (!slotDate) {
            throw new Error('Date not found in doctor slots');
          }
            
             const slot = slotDate.slots.find(s => s.startTime === startTime);
             if (!slot) {
                 throw new Error('Time slot not found');
             }

             
             const update = {
                 docId,
                 date,
                 startTime,
                 isAvailable: false,
                 isBlocked: false  
             };

             // Update the slot availability
            //  const updatedSlot = await this.docSlotRepository.updateSlotAvailability(update);
            const updatedSlot=await this.docSlotRepository.changeSlotAvailability(update)
             console.log('Slot updated:', updatedSlot);
        } catch (error) {
          console.log('error in the service webhook', error);

        }


      }



      return null
    } catch (error) {
      console.log('error in webhook service is ', error);

      return null
    }
  }
}