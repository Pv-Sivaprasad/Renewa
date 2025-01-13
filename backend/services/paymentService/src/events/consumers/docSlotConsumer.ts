import { getChannel } from "../../config/rabbitmq";
import { DocSlotController } from "../../controllers/implementations/slotController";
import { DocSlotService } from "../../services/implementation/DocSlotService";
import { DocSlotRepository } from "../../repositories/implementation/DocSlotRepository";
import { QUEUE_NAMES } from "../../constants/queueConstants";


const slotRepository = new DocSlotRepository();
const slotService = new DocSlotService(slotRepository);
const slotController = new DocSlotController(slotService);

export const receiveDocSlotData = async () => {
    const channel = await getChannel();
    if (!channel) {
        console.log(' Failed to get RabbitMQ channel, service might not be connected');
        return;
    }

    const exchangeName = QUEUE_NAMES.EXCHANGE_NAME;
    const queueName = QUEUE_NAMES.DOC_SLOT_TO_PAYMENT_QUEUE

    try {
        
        await channel.assertExchange(exchangeName, 'fanout', { durable: true });
        await channel.assertQueue(queueName, { durable: true });
        await channel.bindQueue(queueName, exchangeName, '');

        
        channel.consume(queueName, async (msg) => {
            
            
            if (msg) {
                try {
                    console.log('📥 Payment service received DocSlot data');
                    const slotData = JSON.parse(msg.content.toString());
                    console.log('✅ slotData',slotData);
                    
                    await slotController.handleUpsertSlot(
                        { body: slotData } as any,
                        { status: () => ({ json: console.log }) } as any,
                        console.error
                    );
                    
                    channel.ack(msg);
                } catch (error) {
                    console.error(' Error processing DocSlot message in Payment Service:', error);
                    channel.nack(msg, false, false); 
                }
            }
        });

        console.log(`✅ Listening on queue "${queueName}" for DocSlot data.`);
    } catch (error) {
        console.error(' Failed to set up RabbitMQ consumer in Payment Service:', error);
    }
};

export default receiveDocSlotData