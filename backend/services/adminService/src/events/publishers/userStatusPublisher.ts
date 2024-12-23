import { rabbitMqConnect } from "../../config/rabbitmq";

async function publishUserStatusUpdate(message:any) {
    const channel=await rabbitMqConnect()
    if(!channel){
        throw new Error ('Failed to connect to rabbit mq')
    }

    const queueName='AdminToUserQueue'
  
    

    await channel.assertQueue(queueName,{durable:true})
    channel.sendToQueue(queueName,Buffer.from(JSON.stringify(message)),{persistent:true})

    console.log(`Published message to queue ${queueName}:`, message);
    await channel.close();
    
    
} 


 export default publishUserStatusUpdate