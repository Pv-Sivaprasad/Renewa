import { ChatDocument, Message, Participant } from '../../models/chatModel';
import { ChatRepository } from '../../repositories/interface/IChatRepository';
import { ChatService } from '../interface/IChatService';


export class ChatServiceImpl implements ChatService {
  private chatRepo: ChatRepository;

  constructor(chatRepo: ChatRepository) {
    this.chatRepo = chatRepo;
  }

  async sendMessage(chatId: string, message: Message): Promise<ChatDocument | null> {
    return await this.chatRepo.addMessage(chatId, message);
  }

  async initiateChat(participants: Participant[]): Promise<ChatDocument> {
    return await this.chatRepo.createChat(participants);
  }

  async fetchChat(chatId: string): Promise<ChatDocument | null> {
    return await this.chatRepo.getChatById(chatId);
  }

  async endChat(chatId: string): Promise<ChatDocument | null> {
    return await this.chatRepo.endChat(chatId);
  }
}














// import { IChatService } from "../interface/IChatService";
// import { IChatRepository } from "../../repositories/interface/IChatRepository";
// import { ChatRepository } from "../../repositories/implementations/ChatRepository";
// import { IChat } from "../../models/chatModel";
// import { InitiateChat } from "../../dto/chatData";

// export class ChatService implements IChatService{
//     private chatRepository:ChatRepository

//     constructor(){
//         this.chatRepository=new ChatRepository()
//     }


//     async  initiateChat(data:InitiateChat): Promise<IChat> {
//         console.log('inisde the service');
//         const docId=data.docId
//         const docName=data.docName
//         const userId=data.userId
//         const userName=data.userName
//         return this.chatRepository.createChat({docId,docName,userId,userName,messages:[]})
//     }


//     async sendMessage(chatId: string, senderId: string, text: string): Promise<IChat> {
//         console.log('there in the');
        
//         const updatedChat = await this.chatRepository.addMessage(chatId, senderId, text);
//         if (!updatedChat) {
//           throw new Error("Failed to send message. Chat not found.");
//         }
    
//         return updatedChat;
//       }


//     async getChat(docId: string, userId: string): Promise<IChat | null> {
//         console.log('in service');
        
//         let recivedData= this.chatRepository.getChat(docId,userId)
//         return recivedData
//     }

// }