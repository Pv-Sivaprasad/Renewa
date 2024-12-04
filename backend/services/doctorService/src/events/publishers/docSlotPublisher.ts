import { rabbitMqConnect } from "../../config/rabbitmq";


export const sendDocSlotData=async(data:any)=>{
    const channel =await rabbitMqConnect()

    if(!channel){
        throw new Error('Error connecting to rabbit mq')
    }


    const queueName='DocSlotToAdminQueue'
    console.log('sending slot data from doc to admin');
    

    await channel.assertQueue(queueName,{durable:true})

    channel.sendToQueue(queueName,Buffer.from(JSON.stringify(data)))
    console.log('data send q :',queueName);
    
}
