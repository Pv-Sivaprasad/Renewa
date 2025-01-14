import { IChat } from "../../models/chatModel";


export interface IChatService{
   initiateChat(docId: string, docName: string, userId: string, userName: string): Promise<IChat>;
   sendMessage(chatId: string, senderId: string, text: string): Promise<IChat>;
   getChat(docId: string, userId: string): Promise<IChat | null>;
}