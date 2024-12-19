import { rabbitMqConnect } from "../../config/rabbitmq";

export const sendDocDataToUser=async(docData:any)=>{

    const channel =await rabbitMqConnect()
    if(!channel){
        throw new Error('Failed to connect to rabbitMq')
    }

    const queueName='DocToUserQueue'
 
    
    await channel.assertQueue(queueName,{durable:true})


    channel.sendToQueue(queueName,Buffer.from(JSON.stringify(docData)))
    console.log('send data to userQueue');
    

}