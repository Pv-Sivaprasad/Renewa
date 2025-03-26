import { ChatDocument, Message, Participant } from '../../models/chatModel';

export interface ChatService {
  sendMessage(chatId: string, message: Message): Promise<ChatDocument | null>;
  initiateChat(participants: Participant[]): Promise<ChatDocument>;
  fetchChat(chatId: string): Promise<ChatDocument | null>;
  endChat(chatId: string): Promise<ChatDocument | null>;
}



// import { InitiateChat } from "../../dto/chatData";
// import { IChat } from "../../models/chatModel";


// export interface IChatService{
//    initiateChat(data:InitiateChat): Promise<IChat>;
//    sendMessage(chatId: string, senderId: string, text: string): Promise<IChat>;
//    getChat(docId: string, userId: string): Promise<IChat | null>;
// }