import amqlib, { Connection, Channel } from 'amqplib'

let connection: Connection
let channel: Channel


export const rabbitMqConnect = async () => {
 
        if(!connection){
            connection = await amqlib.connect('amqp://localhost')
            channel = await connection.createChannel()
            console.log('connected to rabbit mq userside');
          
        }
        return channel
        
    
}


export const getChannel = (): Channel => channel