import { IChatRepository } from "../interface/IChatRepository";
import Chat,{ IChat } from "../../models/chatModel";

export class ChatRepository implements IChatRepository{
   
   
    getChat(docId: string, userId: string): Promise<IChat | null> {
        throw new Error("Method not implemented.");
    }
   
  
   
    addMessage(chatId: string, senderId: string, text: string): Promise<IChat> {
        throw new Error("Method not implemented.");
    }
   
   
    async createChat(data: Partial<IChat>): Promise<IChat> {
    
        throw new Error(" aksjd");
        
    }

}