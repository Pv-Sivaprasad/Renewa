import { Message, Participant } from '../../models/chatModel';

export interface ChatController {
  sendMessage(chatId: string, message: Message): void;
  initiateChat(participants: Participant[]): void;
  fetchChat(chatId: string): void;
  endChat(chatId: string): void;
}



// import { Request,Response } from "express";

// export interface IChatController{
//     intiateChat(req:Request,res:Response):Promise<void>
//     sendMessage(req:Request,res:Response):Promise<void>
//     getChat(req:Request,res:Response):Promise<void>

// }