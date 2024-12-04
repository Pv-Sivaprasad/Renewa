import { getChannel } from "../../config/rabbitmq";
import { AdminService } from "../../services/adminService";

const adminService= new AdminService()


export const recieveDocSlotData=async()=>{
    const channel=await getChannel()
    if(!channel){
        console.log('failed to get channel,rabbit mq might not be connected');
        return 
    }


    const queueName='DocSlotToAdminQueue'

    await channel.assertQueue(queueName,{durable:true})
    console.log('consumer is ready , waiting for messages in q :',queueName);

    channel.consume(queueName,async(msg)=>{
        console.log('doc slot consumer triggered going to process message');
        
        if(msg){
            const slotData=JSON.parse(msg.content.toString())
            console.log('the slotData recived in admin side is',slotData);

            let docSlotInAdmin=await adminService.upsertSlot(slotData)
            
        }
    })
    


}