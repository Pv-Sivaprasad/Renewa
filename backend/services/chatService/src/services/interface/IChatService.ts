import { InitiateChat } from "../../dto/chatData";
import { IChat } from "../../models/chatModel";


export interface IChatService{
   initiateChat(data:InitiateChat): Promise<IChat>;
   sendMessage(chatId: string, senderId: string, text: string): Promise<IChat>;
   getChat(docId: string, userId: string): Promise<IChat | null>;
}