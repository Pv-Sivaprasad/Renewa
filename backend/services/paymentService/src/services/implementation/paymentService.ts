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
        console.log('Payment DTO:', JSON.stringify(paymentDataDto, null, 2));
        const { docId, startTime, date, userId } = paymentDataDto;
        
        console.log('Extracted values:', { docId, startTime, date });
        
        try {
            const docSlot = await this.docSlotRepostory.findSlot(docId);
            console.log('Doc Slot found:', JSON.stringify(docSlot, null, 2));
            
            const price = docSlot?.consultationFee || 300;
    
            const slotDate = docSlot?.dates.find(d => d.date === paymentDataDto.date);
            console.log('Slot Date found:', JSON.stringify(slotDate, null, 2));
            
            if (!slotDate) {
                throw new Error('No slots found for the selected date');
            }
    
            console.log('Searching for slot with startTime:', startTime);
            console.log('Available slots:', JSON.stringify(slotDate.slots, null, 2));
            
            const slot = slotDate.slots.find(s => s.startTime === startTime);
            console.log('Found slot:', JSON.stringify(slot, null, 2));
             if (!slot?.isAvailable) {
                return { success: false, message: 'Slot already booked' };
            }
            if (!slot) {
                return { success: false, message: 'Slot not available' };
            }else if (slot.isBlocked) {
                return { success: false, message: 'Slot is temporarily unavailable' };
            }  else if (slot) {
                slot.isBlocked = true;
                
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
                        userId ,
                        docId,
                        date,
                    },
                    success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
                    cancel_url: 'http://localhost:5173/cancel',
                });
                
                const update = {
                    docId,
                    date,
                    startTime,
                    isBlocked: true
                };
        
                let modifiedSlot = await this.docSlotRepostory.updateSlotAvailability(update);
                console.log(modifiedSlot, '***********');
                
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
                console.log(response, 'the actual response');
                
                return { success: true, message: "payment session created", id: session.id };
            } else {
                return { success: false, message: "Something went wrong in the service booking" };
            }
        } catch (error) {
            console.log('Error details:', error);
            throw error;
        }
    }


    // async allPaymentData(id:string){
    //     console.log('inisde the payment service for data');
        
    //     try {
    //         const response=await this.paymentRepository.findData(id)
    //         console.log('the response is ',response);
            
    //     } catch (error) {
    //         console.log('error in the payment sevice all data checking',error);
            
    //     }
    // }
    async getUserPayments(userId: string): Promise<IPayment[]> {
        return await this.paymentRepository.getUserPayments(userId);
      }

}