import { getChannel } from "../../config/rabbitMq";
import { DoctorService } from "../../services/doctorService";

const doctorService = new DoctorService()

export const listenForDocStatusUpdate = async () => {
    try {

        const channel = await getChannel()

        const exchangeName = 'DoctorStatusExchange';
        const queueName = 'DoctorServiceQueue';
        console.log('_______________________________');

       
        if (channel) {
      
            await channel.assertExchange(exchangeName, 'fanout', { durable: true });
            await channel.assertQueue(queueName, { durable: true });
            await channel.bindQueue(queueName, exchangeName, '');
      
           
      
            
            channel.consume(queueName, async (msg) => {
            
              if (msg) {
                const { docId, isBlocked, email } = JSON.parse(msg.content.toString());
                
      
                try {
                  await doctorService.updateDocStatus(docId, isBlocked);
              
                  channel.ack(msg); 
                } catch (error) {
                 
                  channel.nack(msg, false, true); 
                }
              } else {
                console.log('Received null message in doctor consumer');
              }
            });
          }

    } catch (error) {

        console.log('error in the doc status consumer', error);


    }
}

