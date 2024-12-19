import {getChannel} from '../../config/rabbitmq'
import { AuthService } from '../../services/authService'


const authService=new AuthService()


export const listenForAdminStatusUpdate = async () =>{
    try {
        const channel= await getChannel()
        console.log('Channel successfully created for doctor consumer');


        const queueName='AdminToDoctorQueue'
        console.log('quenename',queueName);
        
        if(channel){

            await channel.assertQueue(queueName,{durable:true})

            channel.consume(queueName,async (msg)=>{
                console.log('checking message in doctor consumer');
                if(msg){
                    const{docId,isBlocked,email}=JSON.parse(msg.content.toString())
                    console.log(`Received user status update: ${docId}, isBlocked: ${isBlocked}`);

                    try {
                        console.log('11111111111111111111111111111111111111');
                        
                        await authService.updateDoctorStatus(docId,isBlocked,email)
                        console.log(`Successfully updated user ${docId} status to isBlocked: ${isBlocked}`);
                        channel.ack(msg);
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
        
    }
}