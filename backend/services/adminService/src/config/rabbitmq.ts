
import amqplib, { Connection, Channel } from 'amqplib';

let connection: Connection | null = null;
let channel: Channel | null = null;

export const rabbitMqConnect = async (): Promise<Channel | null> => {
  try {
    connection = await amqplib.connect('amqp://localhost:5672');
    channel = await connection.createChannel();
   
    
    console.log('RabbitMQ connected in adminside');
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


