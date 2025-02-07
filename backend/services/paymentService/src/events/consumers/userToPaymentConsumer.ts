import { getChannel } from "../../config/rabbitmq";
import { QUEUE_NAMES } from "../../constants/queueConstants";

export const recieveUserData=async()=>{
    const channel=await getChannel()
    if(!channel){
        console.log('error in connecting to channel payment service');
        return
    }

    const queueName=QUEUE_NAMES.USER_TO_ADMIN_QUEUE
    console.log(queueName,'_____+++++');
    
    await channel.assertQueue(queueName,{durable:true})

    channel.consume(queueName,async(msg)=>{
        if(msg){
            const {userId, username, email } = JSON.parse(msg.content.toString());

            const userData={
                userId:userId,
                username:username,
                email:email
            }
            console.log('the user data in payment consumer',userData);
            

        }
    })


}