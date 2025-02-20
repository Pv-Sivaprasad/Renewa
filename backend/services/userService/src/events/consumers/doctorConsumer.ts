import { getChannel } from "../../config/rabbitMq";
import { ERROR_MESSAGES, QUEUE_NAMES, SUCCESS_MESSAGES } from "../../constants/queueConstants";
import { DoctorRepository } from "../../repositories/implementations/doctorRepository";
import { DoctorService } from "../../services/doctorService";

export const listenForDocDetails=async()=>{
    try {
        const channel=await getChannel()
        console.log('Channel successfully created for doctor consumer in userside');

        // const queueName='DocToUserQueue'
        const queueName=QUEUE_NAMES.DOCTOR_TO_USER_QUEUE
        console.log(queueName,'queueName');

        if(channel){

            await channel.assertQueue(queueName,{durable:true})

            const doctorRepository = new DoctorRepository();
            const doctorService = new DoctorService();

            channel.consume(queueName,async (msg)=>{
             
                if(msg){
                    const{docId,docname,experience,speciality,image}=JSON.parse(msg.content.toString())
                    // console.log(`Received user status update: ${docId}, docname: ${docname} ,experience : ${experience}
                    //     speciality: ${speciality},imgage:${image} `);

                        const docData={
                            docId:docId,
                            docName:docname,
                            experience:experience,
                            speciality:speciality,
                            image:image
                        }

                    try {

                        const existingDoc=await doctorService.getDoctorByDocId(docId)
                        if(existingDoc){
                          

                            await doctorService.updateDoctorDetails(docId,docData)
                           console.log(SUCCESS_MESSAGES.DOC_DATA_SAVED);
                           
                            
                        }else{

                            await doctorService.saveDoctorDetails(docData)
                            console.log(SUCCESS_MESSAGES.DOC_DATA_SAVED);
                        }

                        channel.ack(msg)
                    } catch (error) { 
                        console.log(`Error updating user ${docId} status:`, error);
                        channel.nack(msg, false, true); 
                    }

                }else{
                    console.log('recieved null message in doctor consumer');
                    console.log(ERROR_MESSAGES.CHANNEL_FAILURE);
                    
                }
            })

        }
        
        
    } catch (error) {
        console.error('Error in doctor consumer userSide :', error);
        console.log(ERROR_MESSAGES.CHANNEL_FAILURE);
    }
}