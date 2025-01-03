import { rabbitMqConnect } from "../../config/rabbitmq";
import { QUEUE_NAMES } from "../../constants/queueConstant";
import { DoctorStatusMessage } from "../../utils/messageUtil";


export const sendDocStatusToUser=async(message:DoctorStatusMessage)=>{

    const channel=await rabbitMqConnect()
    if(!channel){
        throw new Error('Failed to connect to rabbitMq')
    }

    // const queueName='DocStatusToUserQueue'
    const queueName=QUEUE_NAMES.DOC_STATUS_TO_USER_QUEUE
 
    
    await channel.assertQueue(queueName,{durable:true})


    channel.sendToQueue(queueName,Buffer.from(JSON.stringify(message)))
    console.log('send data to userQueue');
    
}