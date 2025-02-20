
import { rabbitMqConnect } from "../../config/rabbitMq";
import { QUEUE_NAMES } from "../../constants/queueConstants";
import { UserDataDto } from "../../dto/queueDto";

export const sendUserData = async (userData: UserDataDto) => {
  const channel = await rabbitMqConnect(); 
  if (!channel) {
    throw new Error('Failed to connect to RabbitMQ'); 
  }

  // const queueName = 'userToAdminQueue';
  const queueName=QUEUE_NAMES.USER_TO_ADMIN_QUEUE

  await channel.assertQueue(queueName, { durable: true }); 


  channel.sendToQueue(queueName, Buffer.from(JSON.stringify(userData)));
  console.log('User data sent to queue',queueName);
};


