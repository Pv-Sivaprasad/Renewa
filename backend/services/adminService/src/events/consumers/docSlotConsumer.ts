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
      console.log('Admin consumer is ready, waiting for messages in queue:', queueName);

    channel.consume(queueName,async(msg)=>{
        console.log('doc slot consumer triggered going to process message');
        
        if(msg){
            const slotData=JSON.parse(msg.content.toString())
            console.log('the slotData recived in admin side is',slotData);

            let docSlotInAdmin=await adminService.upsertSlot(slotData)
            

            channel.ack(msg)
            
        }
    })
    


}