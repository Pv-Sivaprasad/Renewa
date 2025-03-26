import { rabbitMqConnect } from "../../config/rabbitmq";
import { QUEUE_NAMES } from "../../constants/queueConstant";


// export interface UserDataDto{
//     docId:string,
//     docname:string,
//     email:string,
//     speciality:string
// }


export const sendDoctorData=async(userData:any)=>{
    const channel=await rabbitMqConnect()
    if(!channel){
        throw new Error('Failed to connect to Rabbit mq')
    }

    // const queueName='doctorToAdminQueue'
    const queueName=QUEUE_NAMES.DOC_TO_ADMIN_QUEUE
    

    await channel.assertQueue(queueName,{durable:true})

    channel.sendToQueue(queueName,Buffer.from(JSON.stringify(userData)))
    console.log('dcotor data sent to queue',queueName);



}

