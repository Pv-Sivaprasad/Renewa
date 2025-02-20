import { rabbitMqConnect } from "../../config/rabbitmq";
import { UserStatusDto } from "../../dto/statusDto";



async function publishUserStatusUpdate(message:UserStatusDto) {
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