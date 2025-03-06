import { any } from "zod";
import { getChannel } from "../../config/rabbitmq";
import { QUEUE_NAMES } from "../../constants/queueConstant";


export const recivedBookData=async()=>{

    const channel=await getChannel()
    if(!channel){
        console.log('failed to get channel');
    }


    const quenename=QUEUE_NAMES.USER_BOOK_TO_DOC
    console.log(quenename,'quenename');

    if(channel){
        await channel.assertQueue(quenename,{durable:true})
        channel.consume(quenename,async(msg)=>{
            console.log('checking msg in the doc consumer of booking data');
            if(msg){
                const{docId,userId,date,startTime}=JSON.parse(msg.content.toString())
                const data={docId,userId,date,startTime}
                
                console.log(docId,userId,date,startTime,'docId','userId','date','startTime');
                
                try {
                    
                } catch (error) {
                    console.log('error in this consumer',error);
                    
                }
            }
        })
    }
    



}