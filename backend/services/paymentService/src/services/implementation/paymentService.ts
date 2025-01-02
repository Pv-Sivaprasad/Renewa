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

//     async createSession(paymentDataDto: PaymentDataDto): Promise<PaymentServiceDto> {

//         console.log('payment dto in the service is ',paymentDataDto);
//         const {docId,slotId,date}=paymentDataDto
        
//         try {
//             const docSlot=await this.docSlotRepostory.findSlot(docId)
//             console.log(docSlot,'data in payment service ');
            
//             const slotDate=docSlot?.dates.find(date=>date.date===paymentDataDto.date)
//             console.log(slotDate,'())()())')
            
//             if(!slotDate ){
//                 throw new Error('No slots found for the selected date')
//             }
//             const slot = slotDate.slots.find(s => 
//                 s._id.toString() === slotId || new Types.ObjectId(s._id).equals(slotId)
//             );
            
//             console.log('Selected slot:', slot);
//         if (!slot) {
//             throw new Error('Slot not found');
//         }

        
//         if (!slot.isAvailable) {
//             throw new Error('Slot is already booked');
//         }

//             return {
//                 success: true,
//                 message: "payment session created",
//                //  id: session.id 
//                }

//         } catch (error) {
//             console.log('error in create session',error);
//             throw error
            
//         }
//     }
async createSession(paymentDataDto: PaymentDataDto): Promise<PaymentServiceDto> {
    console.log('Payment DTO:', JSON.stringify(paymentDataDto, null, 2));
    const { docId, slotId, date,userId } = paymentDataDto;
    
    console.log('Extracted values:', { docId, slotId, date });
    
    try {
        const docSlot = await this.docSlotRepostory.findSlot(docId);
        console.log('Doc Slot found:', JSON.stringify(docSlot, null, 2));
        
        const price=docSlot?.consultationFee || 300;


        const slotDate = docSlot?.dates.find(d => d.date === paymentDataDto.date);
        console.log('Slot Date found:', JSON.stringify(slotDate, null, 2));
        
        if (!slotDate) {
            throw new Error('No slots found for the selected date');
        }

        console.log('Searching for slot with ID:', slotId);
        console.log('Available slots:', JSON.stringify(slotDate.slots, null, 2));
        
        // Check if slotId is valid ObjectId
        const isValidObjectId = Types.ObjectId.isValid(slotId);
        console.log('Is valid ObjectId:', isValidObjectId);

        const slot = slotDate.slots.find(s => {
            const slotIdStr = s._id.toString();
            const inputIdStr = slotId.toString();
            console.log('Comparing:', { slotIdStr, inputIdStr });
            return slotIdStr === inputIdStr;
        });
        
        console.log('Found slot:', JSON.stringify(slot, null, 2));

        

        if (!slot) {
            return {success:false,message:'Slot not available'}
        }else if (!slot.isAvailable) {
            return {success:false,message:'Slot already booked'}
        }else if(slot){
            slot.isAvailable=false

            
            const session = await this.stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [{
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: `slotId: ${slotId}`,
                        },
                        unit_amount: price * 100, 
                    },
                    quantity: 1
                }],
                mode: 'payment',
                metadata: { 
                    slotId, 
                    userId 
                },
                success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: 'http://localhost:5173/cancel',
            });
            
            const update={
                docId,
                date,
                slotId,
                isAvailable:false
            }
    
            let modifiedSlot=await this.docSlotRepostory.updateSlotAvailability(update)
            console.log(modifiedSlot,'***********');
            
            const paymentData :Partial<IPayment> ={
                userId,
                doctorId:docId,
                slotId,
                amount:price,
                status:'pending',
               stripeSessionId:session.id
                
                
            }

            const response=await this.paymentRepository.create(paymentData)
            console.log(response,'the actual response');
            
            return { success: true, message: "payment session created", id: session.id }
        }else{
            return {success:false,message:"Something wernt wrong in the service booking"}
        }


      
    } catch (error) {
        console.log('Error details:', error);
        throw error;
    }
}
}