import { getChannel } from "../../config/rabbitMq";
import { UserService } from "../../services/userService";
import { QUEUE_NAMES,ERROR_MESSAGES,SUCCESS_MESSAGES } from "../../constants/queueConstants";

const userService = new UserService();

export const recieveDocSlotData = async () => {
    const channel = await getChannel();
    if (!channel) {
        console.log('Failed to get channel, RabbitMQ might not be connected');
        return;
    }

    const exchangeName = QUEUE_NAMES.EXCHANGE_NAME;
    const queueName = QUEUE_NAMES.DOC_SLOT_TO_USER_QUEUE;

    
    await channel.assertExchange(exchangeName, 'fanout', { durable: true });
    await channel.assertQueue(queueName, { durable: true });
    await channel.bindQueue(queueName, exchangeName, '');
  

    
    channel.consume(queueName, async (msg) => {
        if (msg) {
            console.log('User consumer triggered, processing message...');
            const slotData = JSON.parse(msg.content.toString());
            // console.log('The slotData received in user side is:', slotData);
            console.log(SUCCESS_MESSAGES.SLOT_DATA_SAVED);
            
            let docSlotinUser= await userService.upsertSlot(slotData)

            // Acknowledge the message
            channel.ack(msg);
        }
    });
};
