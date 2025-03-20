import { Server, Socket } from 'socket.io';
import { ChatService } from '../services/implementations/ChatService';

const chatService = new ChatService();

export default (io: Server) => {
  console.log('Socket handler initialized');
  
  io.on("connect", (socket: Socket) => {
    console.log('User connected:', socket.id);
    
    // Handle sending messages and chat initiation
    socket.on("sendMessage", async (data) => {
      console.log('Message received:', data);
      
      try {
        let savedMessage;
        
        // If chatId is provided, it's an existing chat
        if (data.chatId) {
          savedMessage = await chatService.sendMessage(
            data.chatId,
            data.senderId,
            data.text
          );
        } else {
          // Otherwise, it's a new chat initiation
          savedMessage = await chatService.initiateChat(data);
        }
        
        // Broadcast the message to all connected clients
        // In a production app, you might want to use rooms for private chats
        io.emit('recieved message', savedMessage);
      } catch (error) {
        console.error('Error processing message:', error);
        // Send error back to the client
        socket.emit('error', { message: 'Failed to process message' });
      }
    });
    
    // Handle chat retrieval
    socket.on("getChat", async (data) => {
      try {
        const { docId, userId } = data;
        const chat = await chatService.getChat(docId, userId);
        
        if (chat) {
          // Send chat data only to the requesting client
          socket.emit('chatData', chat);
        } else {
          socket.emit('chatData', null);
        }
      } catch (error) {
        console.error('Error fetching chat:', error);
        socket.emit('error', { message: 'Failed to fetch chat' });
      }
    });
    
    socket.on("disconnect", () => {
      console.log('User disconnected:', socket.id);
    });
  });
};

// import  {Server,Socket} from 'socket.io'

// import { ChatService } from '../services/implementations/ChatService'

// const chatService= new ChatService()

// export default(io:Server)=>{
//     console.log('inside the socket handler');
    
//     io.on("connect",(socket:Socket)=>{
//         console.log('user connected',socket.id);
        
//         socket.on("sendMessage",async(data)=>{
//             const savedMessage=await chatService.initiateChat(data)
//             io.emit('recieved message',savedMessage)
//         })
//         socket.on("disconnect",()=>{
//             console.log('userdisconnected :',socket.id);
            
//         })

//     })  
// }