import { getChannel } from "../../config/rabbitmq"; 
import { AdminService } from "../../services/adminService";

const adminService=new AdminService()


export const recieveUserData = async () => {
   
    const channel = await getChannel();
    if (!channel) {
        console.error('Failed to get channel. RabbitMQ might not be connected.');
        return;
    }
    

    
    const queueName = 'userToAdminQueue';

   
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
            console.log('the exisiting usere is @@@@@@@@@@@@',exisitinguser);

            if(exisitinguser){
                console.log('the user exist');
                await adminService.updateUserDetails(userId,userData)
                console.log('the data has been changed');
                
            }else{
                await adminService.saveUserInAdminDb({ userId, username, email });
                console.log(`User data saved in admin database: ${username}, ${email}`);

            }
            
            channel.ack(message);
        } else {
            console.warn('Received an empty message.');
        }
    });
};
