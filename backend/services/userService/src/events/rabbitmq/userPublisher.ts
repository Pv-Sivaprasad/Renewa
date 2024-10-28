import { getChannel, rabbitMqConnect } from "../../config/rabbitMq"


export const sendUserData=async(userData:any)=>{

    const channel =await rabbitMqConnect()
    const queueName='userToAdminQueue'

    await channel.assertQueue(queueName,{durable:true})

    channel.sendToQueue(queueName,Buffer.from(JSON.stringify(userData)))

}