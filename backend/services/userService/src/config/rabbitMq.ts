
import amqp, { Connection, Channel } from 'amqplib';

let connection: Connection | null = null;
let channel: Channel | null = null;

export const rabbitMqConnect = async (): Promise<Channel | null> => {
  try {
    connection = await amqp.connect('amqp://localhost:5672');
    channel = await connection.createChannel();
    console.log('RabbitMQ connected in userside');
    return channel; 
  } catch (error) {
    console.error('RabbitMQ connection failed:', error);
    return null;
  }
};

export const getChannel = (): Channel | null => {
  if (!channel) {
    console.error('Channel is not available. Ensure RabbitMQ is connected.');
  }
  return channel;
};


// import amqlib, { Connection, Channel } from 'amqplib'

// let connection: Connection
// let channel: Channel


// export const rabbitMqConnect = async () => {
 
//         if(!connection){
//             connection = await amqlib.connect('amqp://localhost:5672')
//             channel = await connection.createChannel()
//             console.log('connected to rabbit mq userside');
          
//         }
//         return channel
        
    
// }


// export const getChannel = (): Channel => channel