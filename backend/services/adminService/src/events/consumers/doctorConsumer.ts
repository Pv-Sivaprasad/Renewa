import { getChannel } from "../../config/rabbitmq";
import { AdminService } from "../../services/adminService";
import { AdminDoctorRepository } from "../../repositories/implementations/AdminDoctorRepository";
import { QUEUE_NAMES,ERROR_MESSAGES,SUCCESS_MESSAGES } from "../../constants/queueConstants";
const adminDoctorRepository= new   AdminDoctorRepository()
const adminService=new AdminService(null as any ,adminDoctorRepository)

export const recieveDoctorData=async()=>{
    const channel=await getChannel()
    if(!channel){
        console.log('failed to get channel,rabbit mq might not be connected');
        return
    }


    const queueName=QUEUE_NAMES.DOCTOR_TO_ADMIN_QUEUE

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
                 console.log(SUCCESS_MESSAGES.USER_UPDATED);
                if(exisitingDoc){
                 
                    await adminService.updateDocDetails(docId,docData)
                    console.log(SUCCESS_MESSAGES.USER_UPDATED);
                    
                }else{
                    console.log('the doc is new doc');
                    
                    await adminService.saveDoctorInAdminDb({docId,docname,email,speciality})
                    console.log(SUCCESS_MESSAGES.USER_SAVED);
                }
                
            } catch (error) {
                console.log('error in try catch of doc consumer admin side',error);
                
            }

            channel.ack(message)
        }else{
            console.warn(ERROR_MESSAGES.EMPTY_MESSAGE);
        }
    })


}