import {IChat} from "../../models/chatModel";

export interface IChatRepository{
    createChat(data:Partial<IChat>):Promise<IChat>
    getChat(docId:string,userId:string):Promise<IChat| null>
    addMessage(chatId:string,senderId:string,text:string):Promise<IChat | null>
} 