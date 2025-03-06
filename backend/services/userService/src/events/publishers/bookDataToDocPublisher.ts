import { rabbitMqConnect } from "../../config/rabbitMq";
import { QUEUE_NAMES } from "../../constants/queueConstants";
import { BookDataDto } from "../../dto/queueDto";

export const userBookData=async(bookData:BookDataDto)=>{


    const channel=await rabbitMqConnect()
    if(!channel){
        throw new Error('Failed to connect to RabbitMQ'); 
    }


    const queueName=QUEUE_NAMES.USER_BOOK_TO_DOC

    await channel.assertQueue(queueName,{durable:true})
    
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(bookData)));
    console.log('User data sent to queue',queueName,'bookData',bookData);
}