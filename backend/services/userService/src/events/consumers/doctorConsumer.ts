import { getChannel } from "../../config/rabbitMq";
import { DoctorRepository } from "../../repositories/implementations/doctorRepository";
import { DoctorService } from "../../services/doctorService";

export const listenForDocDetails=async()=>{
    try {
        const channel=await getChannel()
        console.log('Channel successfully created for doctor consumer in userside');

        const queueName='DocToUserQueue'
        console.log(queueName,'queueName');

        if(channel){

            await channel.assertQueue(queueName,{durable:true})

            const doctorRepository = new DoctorRepository();
            const doctorService = new DoctorService(doctorRepository);

            channel.consume(queueName,async (msg)=>{
                console.log('checking message in doctor consumer');
                if(msg){
                    const{docId,docname,experience,speciality,image}=JSON.parse(msg.content.toString())
                    console.log(`Received user status update: ${docId}, docname: ${docname} ,experience : ${experience}
                        speciality: ${speciality},imgage:${image} `);

                        const docData={
                            docId:docId,
                            docName:docname,
                            experience:experience,
                            speciality:speciality,
                            image:image
                        }

                    try {

                        await doctorService.saveDoctorDetails(docData)
                        console.log(`Doc details saved for the doc with name ${docname} and id ${docId} `);
                        channel.ack(msg)
                    } catch (error) { 
                        console.log(`Error updating user ${docId} status:`, error);
                        channel.nack(msg, false, true); 
                    }

                }else{
                    console.log('recieved null message in doctor consumer');
                    
                }
            })

        }
        
        
    } catch (error) {
        console.error('Error in doctor consumer userSide :', error);
    }
}