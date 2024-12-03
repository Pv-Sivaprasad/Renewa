import { rabbitMqConnect } from "../../config/rabbitmq";


async function PublishDoctorStatusUpdate(message:any) {
    const channel=await rabbitMqConnect()
    if(!channel){
        console.log('rabbit mq might not be connected');
        
    }
    
    const queueName='AdminToDoctorQueue'
    console.log('going to send the data to doctor');
    

    await channel?.assertQueue(queueName,{durable:true})
    channel?.sendToQueue(queueName,Buffer.from(JSON.stringify(message)),{persistent:true})

    console.log(`Published message to queue ${queueName}:`, message);
    await channel?.close()


}

export default PublishDoctorStatusUpdate