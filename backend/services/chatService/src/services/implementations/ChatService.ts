import { IChatService } from "../interface/IChatService";
import { IChatRepository } from "../../repositories/interface/IChatRepository";
import { ChatRepository } from "../../repositories/implementations/ChatRepository";
import { IChat } from "../../models/chatModel";


export class ChatService implements IChatService{
    private chatRepository:ChatRepository

    constructor(){
        this.chatRepository=new ChatRepository()
    }


    async  initiateChat(docId: string, docName: string, userId: string, userName: string): Promise<IChat> {
        console.log('inisde the service');
        
        return this.chatRepository.createChat({docId,docName,userId,userName,messages:[]})
    }


    async sendMessage(chatId: string, senderId: string, text: string): Promise<IChat> {
        console.log('there in the');
        
        const updatedChat = await this.chatRepository.addMessage(chatId, senderId, text);
        if (!updatedChat) {
          throw new Error("Failed to send message. Chat not found.");
        }
    
        return updatedChat;
      }


    async getChat(docId: string, userId: string): Promise<IChat | null> {
        console.log('in service');
        
        let recivedData= this.chatRepository.getChat(docId,userId)
        return recivedData
    }

}