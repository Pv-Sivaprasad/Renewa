import { getChannel } from "../../config/rabbitmq";
import { AdminService } from "../../services/adminService";

const adminService=new AdminService()

export const recieveDoctorData=async()=>{
    const channel=await getChannel()
    if(!channel){
        console.log('failed to get channel,rabbit mq might not be connected');
        return
    }


    const queueName='doctorToAdminQueue'

    await channel.assertQueue(queueName,{durable:true})
    console.log(`doctorConsumer is ready, waiting for messages on queue: ${queueName}`);
    
    channel.consume(queueName,async(message)=>{
        console.log('doctor consumer triggered attempting to process message');
        
        if(message){
            const {docId,docname,email,speciality}=JSON.parse(message.content.toString())
            console.log(`Received message: docId: ${docId}, docname: ${docname}, Email: ${email} speciality: ${speciality} `);


            await adminService.saveDoctorInAdminDb({docId,docname,email,speciality})
            console.log(`Doctor data saved in admin database: ${docname}, ${email}`);

            channel.ack(message)
        }else{
            console.warn('Recieved an empty message')
        }
    })


}