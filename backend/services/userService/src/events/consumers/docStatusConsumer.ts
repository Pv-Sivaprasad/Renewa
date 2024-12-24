import { getChannel } from "../../config/rabbitMq";
import { DoctorService } from "../../services/doctorService";

const doctorService= new DoctorService()


export const listenForDocStatusUpdate=  async()=>{
  try {
    const channel=getChannel()
    console.log('channel connected successfully');

    const queueName='DocStatusToUserQueue'
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
            channel.ack(msg)
          } catch (error) {
            
          }
        }
        
      })
    }
  } catch (error) {
    console.log('error in docSTatupdate in userSErvice',error);
    
  }
}