import { rabbitMqConnect } from "../../config/rabbitmq";


export const sendDoctorData=async(userData:any)=>{
    const channel=await rabbitMqConnect()
    if(!channel){
        throw new Error('Failed to connect to Rabbit mq')
    }

    const queueName='doctorToAdminQueue'
    console.log('going to send doc data to admin');
    

    await channel.assertQueue(queueName,{durable:true})

    channel.sendToQueue(queueName,Buffer.from(JSON.stringify(userData)))
    console.log('dcotor data sent to queue',queueName);



}

