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
    console.log(`userConsumer is ready, waiting for messages on queue: ${queueName}`);

    
    channel.consume(queueName, async (message) => {
        console.log('Consumer callback triggered, attempting to process message.');

        if (message) {
            
            const { userId, username, email } = JSON.parse(message.content.toString());
            console.log(`Received message: UserId: ${userId}, Username: ${username}, Email: ${email}`);

            const userData={
                userId:userId,
                username:username,
                email:email
            }

            const exisitinguser=await 
            
            await adminService.saveUserInAdminDb({ userId, username, email });
            console.log(`User data saved in admin database: ${username}, ${email}`);

         
            channel.ack(message);
        } else {
            console.warn('Received an empty message.');
        }
    });
};
