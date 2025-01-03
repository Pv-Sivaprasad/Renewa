import { getChannel } from "../../config/rabbitmq"; 
import { AdminService } from "../../services/adminService";
import { AdminUserRepository } from "../../repositories/implementations/AdminUserRepository";
import { QUEUE_NAMES,SUCCESS_MESSAGES,ERROR_MESSAGES } from "../../constants/queueConstants";

const adminUserRepo=new AdminUserRepository()
const adminService=new AdminService(adminUserRepo,null as any)


export const recieveUserData = async () => {
   
    const channel = await getChannel();
    if (!channel) {
        console.error('Failed to get channel. RabbitMQ might not be connected.');
        return;
    }
    

    
    const queueName = QUEUE_NAMES.USER_TO_ADMIN_QUEUE;

   
    await channel.assertQueue(queueName, { durable: true });
   
    
    channel.consume(queueName, async (message) => {
       

        if (message) {
            
            const { userId, username, email } = JSON.parse(message.content.toString());
          

            const userData={
                userId:userId,
                username:username,
                email:email
            }

            const exisitinguser=await adminService.getUserDetails(userId)  
            // console.log('the exisiting usere is @@@@@@@@@@@@',exisitinguser);

            if(exisitinguser){
               
                await adminService.updateUserDetails(userId,userData)
                console.log(SUCCESS_MESSAGES.USER_UPDATED);
                
            }else{
                await adminService.saveUserInAdminDb({ userId, username, email });
                // console.log(`User data saved in admin database: ${username}, ${email}`);
                console.log(SUCCESS_MESSAGES.USER_SAVED);
            }
            
            channel.ack(message);
        } else {
            console.warn(ERROR_MESSAGES.EMPTY_MESSAGE);
        }
    });
};
