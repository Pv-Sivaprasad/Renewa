import { getChannel } from "../config/rabbitmq"; 
import { saveUserInAdminDb } from "../services/adminService"; 

export const recieveUserData = async () => {
   
    const channel = await getChannel();
    if (!channel) {
        console.error('Failed to get channel. RabbitMQ might not be connected.');
        return;
    }
    

    
    const queueName = 'userToAdminQueue';

   
    await channel.assertQueue(queueName, { durable: true });
    console.log(`Consumer is ready, waiting for messages on queue: ${queueName}`);

    
    channel.consume(queueName, async (message) => {
        console.log('Consumer callback triggered, attempting to process message.');

        if (message) {
            
            const { userId, username, email } = JSON.parse(message.content.toString());
            console.log(`Received message: UserId: ${userId}, Username: ${username}, Email: ${email}`);

            
            await saveUserInAdminDb({ userId, username, email });
            console.log(`User data saved in admin database: ${username}, ${email}`);

         
            channel.ack(message);
        } else {
            console.warn('Received an empty message.');
        }
    });
};
