import { rabbitMqConnect } from "../../config/rabbitmq";
import { QUEUE_NAMES } from "../../constants/queueConstants";

export interface Updatedata{
   
        userId:string
        docId:string
        date:string
        startTime:string
        isAvailable:boolean
      
}

export const sendPaymentInfo=async(data:Updatedata)=>{
    const channel=await rabbitMqConnect()

    if(!channel){
        throw new Error('Error connecting to rabbit mq')
    }

    const paymentData=QUEUE_NAMES.PAYMENT_EXCHANGE_NAME 


    await channel.assertExchange(paymentData, 'fanout', { durable: true });

    
    channel.publish(paymentData, '', Buffer.from(JSON.stringify(data)));

   
}
