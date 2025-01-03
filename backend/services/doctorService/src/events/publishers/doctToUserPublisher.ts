import { rabbitMqConnect } from "../../config/rabbitmq";
import { QUEUE_NAMES } from "../../constants/queueConstant";

export const sendDocDataToUser=async(docData:any)=>{

    const channel =await rabbitMqConnect()
    if(!channel){
        throw new Error('Failed to connect to rabbitMq')
    }

    // const queueName='DocToUserQueue'
    const queueName=QUEUE_NAMES.DOC_TO_USER_QUEUE
    
    await channel.assertQueue(queueName,{durable:true})


    channel.sendToQueue(queueName,Buffer.from(JSON.stringify(docData)))
    console.log('send data to userQueue');
    

}