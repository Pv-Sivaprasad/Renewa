import { getChannel } from "../../config/rabbitmq";
import { SUCCESS_MESSAGES } from "../../constants/queueConstants";
import { AdminDocSlotRepository } from "../../repositories/implementations/AdminDocSlotRepository";
import { AdminService } from "../../services/adminService";
import AdminSlotService from "../../services/adminSlotService";

const adminDocSlotRepository=new AdminDocSlotRepository()
// const adminService= new AdminService()
const adminSlotService= new AdminSlotService(adminDocSlotRepository)


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
            

            // let docSlotInAdmin=await adminService.upsertSlot(slotData)
            let docSlotInAdmin=await adminSlotService.upsertSlot(slotData)
            console.log(SUCCESS_MESSAGES.SLOT_SAVED);
            
            channel.ack(msg)
            
        }
    })
    


}