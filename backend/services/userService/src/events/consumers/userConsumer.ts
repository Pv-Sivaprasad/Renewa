import { getChannel } from "../../config/rabbitMq";
import { QUEUE_NAMES } from "../../constants/queueConstants";
import { AuthService } from "../../services/authService";

const userService = new AuthService();

export const listenForUserStatusUpdate = async () => {
    try {
        const channel = await getChannel();
        console.log('Channel successfully created for user consumer');

        // const queueName = 'AdminToUserQueue';
        const queueName=QUEUE_NAMES.ADMIN_TO_USER_QUEUE

        if(channel){

            await channel.assertQueue(queueName, { durable: true });
            
          
            channel.consume(queueName, async (msg) => {
                console.log('Checking message...');
                if (msg) {
                    const { userId, isBlocked } = JSON.parse(msg.content.toString());
                    console.log(`Received user status update: ${userId}, isBlocked: ${isBlocked}`);
                    try {
                        await userService.updateUserStatus(userId, isBlocked);
                        console.log(`Successfully updated user ${userId} status to isBlocked: ${isBlocked}`);
                        channel.ack(msg);
                    } catch (error) {
                        console.log(`Error updating user ${userId} status:`, error);
                        channel.nack(msg, false, true); 
                    }
                } else {
                    console.log('Received null message');
                }
            }); 
            { noAck: false };
        }
    
    } catch (error) {
        console.error('Failed to setup consumer. RabbitMQ might not be connected:', error);
    }
};

