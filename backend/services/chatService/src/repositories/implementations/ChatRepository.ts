import { Chat, ChatDocument, Message, Participant } from '../../models/chatModel';
import { ChatRepository } from '../interface/IChatRepository';

export class ChatRepositoryImpl implements ChatRepository {
  async createChat(participants: Participant[]): Promise<ChatDocument> {
    const newChat = new Chat({ participants, messages: [] });
    return await newChat.save();
  }

  async addMessage(chatId: string, message: Message): Promise<ChatDocument | null> {
    const chat = await Chat.findById(chatId);
    if (!chat) return null;

    chat.messages.push(message);
    chat.updatedAt = new Date();
    return await chat.save();
  }

  async getChatById(chatId: string): Promise<ChatDocument | null> {
    return await Chat.findById(chatId);
  }

  async endChat(chatId: string): Promise<ChatDocument | null> {
    const chat = await Chat.findById(chatId);
    if (!chat) return null;

    chat.isActive = false;
    chat.updatedAt = new Date();
    return await chat.save();
  }
}




// import { IChatRepository } from "../interface/IChatRepository";
// import Chat,{ IChat } from "../../models/chatModel";


// export class ChatRepository  implements IChatRepository {
   
   
//    async  getChat(docId: string, userId: string): Promise<IChat | null> {
//     console.log('in the repo');
    
//         let data= await Chat.findOne({docId,userId})
//         console.log('the data is',data);
        
//         return data
//       }
   
  
   
//     async addMessage(chatId: string, senderId: string, text: string): Promise<IChat | null> {
//       console.log('ooohoooo');
      
//       const updatedChat= await Chat.findByIdAndUpdate(
//         chatId,
//         {$push:{messages:{senderId,text,timeStamp:new Date()}}},
//         {new:true}
//       )
//       if(!updatedChat){
//         throw new Error('Chat not found')
//       }
//       return  updatedChat
//     }
   
   
//     async createChat(data: Partial<IChat>): Promise<IChat> {
//     console.log('inside the repository');
    
//        const chat = new Chat(data)
//        return await chat.save()
        
//     }

// }