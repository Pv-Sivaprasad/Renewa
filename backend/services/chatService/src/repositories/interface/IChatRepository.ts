import { ChatDocument, Message, Participant } from '../../models/chatModel';

export interface ChatRepository {
  createChat(participants: Participant[]): Promise<ChatDocument>;
  addMessage(chatId: string, message: Message): Promise<ChatDocument | null>;
  getChatById(chatId: string): Promise<ChatDocument | null>;
  endChat(chatId: string): Promise<ChatDocument | null>;
}





// import {IChat} from "../../models/chatModel";

// export interface IChatRepository{
//     createChat(data:Partial<IChat>):Promise<IChat>
//     getChat(docId:string,userId:string):Promise<IChat| null>
//     addMessage(chatId:string,senderId:string,text:string):Promise<IChat | null>
// } 