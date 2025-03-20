import { getChannel } from "../../config/rabbitmq";
import { QUEUE_NAMES } from "../../constants/queueConstant";
import { DoctorBookingRepository } from "../../repositories/implementations/docBookRepository";
import { BookService } from "../../services/bookService";
import { SlotService } from "../../services/slotService";

const slotService=new SlotService()
const bookService=new BookService(new DoctorBookingRepository())
export const getPaymentData=async()=>{
    const channel= await getChannel()
    if(!channel){
        console.log('failed to get channel');
        
    }

    const paymentExchangeName=QUEUE_NAMES.PAYMENT_EXCHANGE_NAME
    const queueName=QUEUE_NAMES.PAY_EXC_NAME

    await channel?.assertExchange(paymentExchangeName,'fanout',{durable:true})
    await channel?.assertQueue(queueName,{durable:true})
    await channel?.bindQueue(queueName,paymentExchangeName,'')

    channel?.consume(queueName,async(msg)=>{
        if(msg){
            console.log(' ✅  ✅ doc payment consumer  triggered, processing message...');
            const slotData = JSON.parse(msg.content.toString());

            console.log(' ✅  ✅ The slotData received in doc side is:', slotData);
            const{userId,docId,date,startTime,isAvailable,userName}=JSON.parse(msg.content.toString());
          
            try {
                await bookService.processBooking(docId, userId, date, startTime, userName);
                channel.ack(msg);
              } catch (error) {
                console.log('error in this consumer', error);
              }
            let docSlotData=await slotService.getSlotsByDocId(docId,date)
            // console.log('the docSlotData',docSlotData,'*///*/*/*/*/');
            
            if(docSlotData){
                const updatedSlot=docSlotData.map(slot=>{
                    if(slot.startTime===startTime){
                        return{
                            ...slot,
                            isAvailable:false
                        }
                    }
                    return slot
                })
                // console.log('the data that is going to be updatd is ',updatedSlot);
                // let response=await slotService.
                const data = { docId, userId, date, startTime, userName };
      
                
            }
            channel.ack(msg);
        }
    })

}