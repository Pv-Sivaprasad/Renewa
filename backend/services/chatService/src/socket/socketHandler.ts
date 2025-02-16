import  {Server,Socket} from 'socket.io'

import { ChatService } from '../services/implementations/ChatService'

const chatService= new ChatService()

export default(io:Server)=>{
    
    io.on("connection",(socket:Socket)=>{
        console.log('user connected',socket.id);
        
        socket.on("sendMessage",async(data)=>{
            const savedMessage=await chatService.initiateChat(data)
            io.emit('recieved message',savedMessage)
        })
        socket.on("disconnect",()=>{
            console.log('userdisconnected :',socket.id);
            
        })

    })
}