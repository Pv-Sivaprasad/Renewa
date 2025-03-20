import { IPayment } from "../../models/paymentModel";
import { IPaymentService } from "../interface/IPaymentService";
import Stripe from "stripe";
import { Types } from 'mongoose';
import { PaymentDataDto, PaymentServiceDto } from "../../dto/paymentDto";
import { PaymentRepository } from "../../repositories/implementation/PaymentRepository";
import { DocSlotRepository } from "../../repositories/implementation/DocSlotRepository";


export class PaymentService implements IPaymentService{
    private stripe:Stripe
    private paymentRepository:PaymentRepository
    private docSlotRepostory:DocSlotRepository

    constructor(paymentRepository:PaymentRepository,docSlotRepository:DocSlotRepository){
        
        this.stripe= new Stripe(process.env.STRIPE_SECRET_KEY!)
        this.paymentRepository=paymentRepository
        this.docSlotRepostory=docSlotRepository
    }
    allPaymentData(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
  


    async createSession(paymentDataDto: PaymentDataDto): Promise<PaymentServiceDto> {
        const { docId, startTime, date, userId ,userName} = paymentDataDto;
    
        try {
            const docSlot = await this.docSlotRepostory.findSlot(docId);
            const price = docSlot?.consultationFee || 300;
    
            const slotDate = docSlot?.dates.find(d => d.date === paymentDataDto.date);
            if (!slotDate) {
                throw new Error('No slots found for the selected date');
            }
    
            const slot = slotDate.slots.find(s => s.startTime === startTime);
            if (!slot) {
                return { success: false, message: 'Slot not available' };
            }
            if (!slot.isAvailable) {
                return { success: false, message: 'Slot already booked' };
            }
            if (slot.isBlocked) {
                return { success: false, message: 'Slot is temporarily unavailable' };
            }
    
         
            slot.isBlocked = true;
            const update = {
                docId,
                date,
                startTime,
                isBlocked: true,
                userName
            };
            await this.docSlotRepostory.updateSlotAvailability(update);
    
           
            const timeoutId = setTimeout(async () => {
                try {
                    const revertUpdate = {
                        docId,
                        date,
                        startTime,
                        isBlocked: false,
                        userName
                    };
                    await this.docSlotRepostory.updateSlotAvailability(revertUpdate);
                    console.log(`Slot ${startTime} on ${date} for doc ${docId} unblocked after 2 minutes`);
                } catch (error) {
                    console.error('Error reverting slot block:', error);
                }
            }, 120000);
    
            
            const session = await this.stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [{
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: `Appointment at ${startTime}`,
                        },
                        unit_amount: price * 100,
                    },
                    quantity: 1
                }],
                mode: 'payment',
                metadata: { 
                    startTime,
                    userId,
                    docId,
                    date,
                    userName,
                    // timeoutId: timeoutId.toString() 
                },
                success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: 'http://localhost:5173/cancel',
            });
    
            const paymentData: Partial<IPayment> = {
                userId,
                doctorId: docId,
                startTime,
                date,
                amount: price,
                status: 'pending',
                stripeSessionId: session.id
            };
    
            const response = await this.paymentRepository.create(paymentData);
            return { success: true, message: "payment session created", id: session.id };
        } catch (error) {
            console.log('Error details:', error);
            throw error;
        }
    }




    async getUserPayments(userId: string): Promise<IPayment[]> {
        return await this.paymentRepository.getUserPayments(userId);
      }

}