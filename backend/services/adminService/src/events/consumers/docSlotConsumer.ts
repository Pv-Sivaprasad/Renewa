import { getChannel } from "../../config/rabbitmq";
import { AdminService } from "../../services/adminService";

const adminService= new AdminService()



export const recieveDocSlotData=async()=>{
    const channel=await getChannel()
    if(!channel){
        console.log('failed to get channel,rabbit mq might not be connected');
        return 
    }


    const exchangeName = 'DocSlotExchange';
    const queueName = 'DocSlotToAdminQueue';

      // Assert the exchange and bind the queue to it
      await channel.assertExchange(exchangeName, 'fanout', { durable: true });
      await channel.assertQueue(queueName, { durable: true });
      await channel.bindQueue(queueName, exchangeName, '');
     

    channel.consume(queueName,async(msg)=>{
     
        
        if(msg){
            const slotData=JSON.parse(msg.content.toString())
            

            let docSlotInAdmin=await adminService.upsertSlot(slotData)
            

            channel.ack(msg)
            
        }
    })
    


}