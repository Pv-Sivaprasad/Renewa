import { IChatRepository } from "../interface/IChatRepository";
import Chat,{ IChat } from "../../models/chatModel";

export class ChatRepository implements IChatRepository{
   
   
   async  getChat(docId: string, userId: string): Promise<IChat | null> {
    console.log('in the repo');
    
        let data= await Chat.findOne({docId,userId})
        console.log('the data is',data);
        
        return data
      }
   
  
   
    async addMessage(chatId: string, senderId: string, text: string): Promise<IChat | null> {
      console.log('ooohoooo');
      
      const updatedChat= await Chat.findByIdAndUpdate(
        chatId,
        {$push:{messages:{senderId,text,timeStamp:new Date()}}},
        {new:true}
      )
      if(!updatedChat){
        throw new Error('Chat not found')
      }
      return  updatedChat
    }
   
   
    async createChat(data: Partial<IChat>): Promise<IChat> {
    console.log('inside the repository');
    
       const chat = new Chat(data)
       return await chat.save()
        
    }

}