
import { rabbitMqConnect } from "../../config/rabbitMq";

export const sendUserData = async (userData: any) => {
  const channel = await rabbitMqConnect(); 
  if (!channel) {
    throw new Error('Failed to connect to RabbitMQ'); 
  }

  const queueName = 'userToAdminQueue';
 

  await channel.assertQueue(queueName, { durable: true }); 


  channel.sendToQueue(queueName, Buffer.from(JSON.stringify(userData)));
  console.log('User data sent to queue',queueName);
};


