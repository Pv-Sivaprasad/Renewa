import { getChannel } from "../../config/rabbitMq";
import { UserService } from "../../services/userService";

const userService = new UserService();

export const recieveDocSlotData = async () => {
    const channel = await getChannel();
    if (!channel) {
        console.log('Failed to get channel, RabbitMQ might not be connected');
        return;
    }

    const exchangeName = 'DocSlotExchange';
    const queueName = 'DocSlotToUserQueue';

    // Assert the exchange and bind the queue to it
    await channel.assertExchange(exchangeName, 'fanout', { durable: true });
    await channel.assertQueue(queueName, { durable: true });
    await channel.bindQueue(queueName, exchangeName, '');
    console.log('User consumer is ready in , waiting for messages in queue:', queueName);

    // Start consuming messages
    channel.consume(queueName, async (msg) => {
        if (msg) {
            console.log('User consumer triggered, processing message...');
            const slotData = JSON.parse(msg.content.toString());
            console.log('The slotData received in user side is:', slotData);

            let docSlotinUser= await userService.upsertSlot(slotData)

            // Acknowledge the message
            channel.ack(msg);
        }
    });
};
