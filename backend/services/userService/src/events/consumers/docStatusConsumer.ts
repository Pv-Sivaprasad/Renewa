import { getChannel } from "../../config/rabbitMq";
import { ERROR_MESSAGES, QUEUE_NAMES, SUCCESS_MESSAGES } from "../../constants/queueConstants";
import { DoctorService } from "../../services/doctorService";

const doctorService= new DoctorService()


export const listenForDocStatusUpdate=  async()=>{
  try {
    const channel=getChannel()
    console.log('channel connected successfully');

    const queueName=QUEUE_NAMES.DOCTOR_STATUS_TO_USER_QUEUE
    console.log(queueName,"queueName");
    
    if(channel){
      await channel.assertQueue(queueName,{durable:true})

      channel.consume(queueName,async(msg)=>{
        console.log('processing messsage');
        if(msg){
          const{docId,isBlocked}=JSON.parse(msg.content.toString())
          console.log(`Received user status update: ${docId}, isBlocked: ${isBlocked}`);
          try {
            await doctorService.updateDocStatus(docId,isBlocked)
            console.log(`Successfully updated user ${docId} status to isBlocked: ${isBlocked}`);
            console.log(SUCCESS_MESSAGES.DOC_STATUS_UPDATED);
            
            channel.ack(msg)
          } catch (error) {
            
          }
        }
        
      })
    }
  } catch (error) {
    console.log('error in docSTatupdate in userSErvice',error);
    console.log(ERROR_MESSAGES.CHANNEL_FAILURE);
    
  }
}