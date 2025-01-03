import { rabbitMqConnect } from "../../config/rabbitmq";
import { QUEUE_NAMES } from "../../constants/queueConstant";


export const sendDocSlotData=async(data:any)=>{
    const channel =await rabbitMqConnect()

    if(!channel){
        throw new Error('Error connecting to rabbit mq')
    }


    // const exchangeName = 'DocSlotExchange';
    const exchangeName=QUEUE_NAMES.EXCHANGE_NAME

    
    await channel.assertExchange(exchangeName, 'fanout', { durable: true });

    
    channel.publish(exchangeName, '', Buffer.from(JSON.stringify(data)));

   
        
}
