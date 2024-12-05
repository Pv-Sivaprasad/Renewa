import { rabbitMqConnect } from "../../config/rabbitmq";


export const sendDocSlotData=async(data:any)=>{
    const channel =await rabbitMqConnect()

    if(!channel){
        throw new Error('Error connecting to rabbit mq')
    }


    const exchangeName = 'DocSlotExchange';
    console.log('Sending slot data from doctor to all consumers...');

    
    await channel.assertExchange(exchangeName, 'fanout', { durable: true });

    
    channel.publish(exchangeName, '', Buffer.from(JSON.stringify(data)));
    console.log('Slot data published to exchange:', exchangeName);
    
}
