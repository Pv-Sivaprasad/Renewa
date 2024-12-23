import { rabbitMqConnect } from "../../config/rabbitmq";

async function PublishDoctorStatusUpdate(message: any) {
  const channel = await rabbitMqConnect();

  if (!channel) {
    console.log('RabbitMQ might not be connected');
    return;
  }

  const exchangeName = 'DoctorStatusExchange'; // Fanout  exchange name

  try {
    // Assert the fanout exchange
    await channel.assertExchange(exchangeName, 'fanout', { durable: true });

    // Publish the message to the exchange (no routing key needed for fanout)
    channel.publish(exchangeName, '', Buffer.from(JSON.stringify(message)), { persistent: true });

    console.log(`Published message to exchange ${exchangeName}:`, message);
  } catch (error) {
    console.error('Error publishing message to exchange:', error);
  } finally {
    await channel.close();
  }
}

export default PublishDoctorStatusUpdate;



// import { rabbitMqConnect } from "../../config/rabbitmq";


// async function PublishDoctorStatusUpdate(message:any) {
//     const channel=await rabbitMqConnect()
//     if(!channel){
//         console.log('rabbit mq might not be connected');
        
//     }
    
//     const queueName='AdminToDoctorQueue'
  
    

//     await channel?.assertQueue(queueName,{durable:true})
//     channel?.sendToQueue(queueName,Buffer.from(JSON.stringify(message)),{persistent:true})

//     console.log(`Published message to queue ${queueName}:`, message);
//     await channel?.close()


// }

// export default PublishDoctorStatusUpdate