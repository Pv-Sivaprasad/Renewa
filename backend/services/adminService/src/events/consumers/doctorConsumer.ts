import { getChannel } from "../../config/rabbitmq";
import { AdminService } from "../../services/adminService";
import { AdminDoctorRepository } from "../../repositories/implementations/AdminDoctorRepository";

const adminDoctorRepository= new   AdminDoctorRepository()
const adminService=new AdminService(null as any ,adminDoctorRepository)

export const recieveDoctorData=async()=>{
    const channel=await getChannel()
    if(!channel){
        console.log('failed to get channel,rabbit mq might not be connected');
        return
    }


    const queueName='doctorToAdminQueue'

    await channel.assertQueue(queueName,{durable:true})

    
    channel.consume(queueName,async(message)=>{
      
        
        if(message){
            const {docId,docname,email,speciality,isBlocked}=JSON.parse(message.content.toString())
            // console.log(`Received message: docId: ${docId},
            //      docname: ${docname}, Email: ${email},
            //       speciality: ${speciality}
            //       isBlocked: ${isBlocked} `);

            const docData={
                docId:docId,
                docname:docname,
                email:email,
                speciality:speciality,
                isBlocked:isBlocked,
            }
            // console.log('the docdata in admin consumer is ',docData);
            
            try {
                const exisitingDoc=await adminService.getDocDetails(docId)
                // console.log(exisitingDoc,'***************************');
                
                if(exisitingDoc){
                 
                    await adminService.updateDocDetails(docId,docData)
                  
                    
                }else{
                    console.log('the doc is new doc');
                    
                    await adminService.saveDoctorInAdminDb({docId,docname,email,speciality})
                 
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