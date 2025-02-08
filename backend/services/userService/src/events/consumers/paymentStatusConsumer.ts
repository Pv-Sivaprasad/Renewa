import { rabbitMqConnect } from "../../config/rabbitMq";
import { QUEUE_NAMES } from "../../constants/queueConstants";
import { DocSlotService } from "../../services/docSlotService";

const docSlotService=new DocSlotService()

export const getPaymentData=async()=>{
    const channel=await rabbitMqConnect()
    if(!channel){
        throw new Error('Error getting channel ')
    }

    const paymentExchangeName=QUEUE_NAMES.PAYMENT_EXCHANGE_NAME
    const queueName=QUEUE_NAMES.PAY_EXC_NAME 


    await channel.assertExchange(paymentExchangeName,'fanout',{durable:true})
    await channel?.assertQueue(queueName,{durable:true})
    await channel?.bindQueue(queueName,paymentExchangeName,'')

    channel.consume(queueName,async(msg)=>{
        if(msg){
            console.log(' ✅  ✅  payment consumer  triggered, processing message in userService...');
            const slotData = JSON.parse(msg.content.toString());

            console.log(' ✅  ✅ The slotData received in user side is:', slotData);
            const{userId,docId,date,startTime,isAvailable}=JSON.parse(msg.content.toString());
            console.log(`userId ${userId} ,docId ${docId} ,date ${date} ,startTime ${startTime} ,isAvailable ${isAvailable}`)

            const updateData={userId,docId,date,startTime,isAvailable}
            let update=await docSlotService.updateSlot(updateData)
            channel.ack(msg);
        }
    })


}