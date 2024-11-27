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
            const {docId,docname,email,speciality,isBlocked}=JSON.parse(message.content.toString())
            console.log(`Received message: docId: ${docId},
                 docname: ${docname}, Email: ${email},
                  speciality: ${speciality}
                  isBlocked: ${isBlocked} `);

            const docData={
                docId:docId,
                docname:docname,
                email:email,
                speciality:speciality,
                isBlocked:isBlocked,
            }
            console.log('the docdata in admin consumer is ',docData);
            
            try {
                const exisitingDoc=await adminService.getDocDetails(docId)
                console.log(exisitingDoc,'***************************');
                
                if(exisitingDoc){
                    console.log('the doc is existing');
                    await adminService.updateDocDetails(docId,docData)
                    console.log('dodcot data changed in admindb');
                    
                }else{
                    
                    await adminService.saveDoctorInAdminDb({docId,docname,email,speciality})
                    console.log(`Doctor data saved in admin database: ${docname}, ${email}`);
                }
                
            } catch (error) {
                console.log('error in try catch of doc consumer admin side',error);
                
            }

            channel.ack(message)
        }else{
            console.warn('Recieved an empty message')
        }
    })


}