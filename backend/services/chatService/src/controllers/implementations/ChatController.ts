import { Request,Response } from "express";
import { IChatController } from "../interface/IChatController";
import { IChatService } from "../../services/interface/IChatService";
import { ChatService } from "../../services/implementations/ChatService";
import { HttpStatus } from "../../enums/HttpStatus";
import { log } from "util";




export class ChatController implements IChatController{
    private chatService:ChatService

    constructor(chatService:ChatService){
        this.chatService= new ChatService()
        console.log("ChatService instance:", this.chatService);
    }


    async intiateChat(req: Request, res: Response): Promise<void> {
        console.log('reached in the controller');
        
        const {docId,userId,userName,docName}=req.body
        console.log(`docId${docId}  userId${userId}  userName${userName}  docName${docName}`);
        if (!docId || !userId || !docName || !userName) {
            throw new Error("Invalid data provided for initiating chat.");
        }
        const data={
            docId,docName,userId,userName
        }
        // const chat =  await this.chatService.initiateChat(docId,docName,userId,userName)
        // const chat =await this.chatService.initiateChat(docId,docName,userId,userName)
           const chat=await this.chatService.initiateChat(data)
        console.log('the initiated chat is ',chat);
        res.status(HttpStatus.CREATED).json(chat)
        return
    }
    async sendMessage(req: Request, res: Response): Promise<void> {
        console.log('in there');
        
       const {chatId,senderId,text}=req.body
       console.log(`chatId${chatId},senderId${senderId}text${text}`);
       
       const updatedChat=await this.chatService.sendMessage(chatId,senderId,text) 
       if(!updatedChat){
        res.status(HttpStatus.NOT_FOUND).json('No chat foud')
       }
       res.status(HttpStatus.CREATED).json(updatedChat)
    }
 
    async getChat(req: Request, res: Response): Promise<void> {
        console.log('int he get chat');
        
        const {docId,userId}=req.query
        const chat=await this.chatService.getChat(docId as string,userId as string)
        if(!chat){
            res.status(HttpStatus.NOT_FOUND).json('No chat found')
            return 
        }
        res.status(HttpStatus.CREATED).json(chat)
    }
} 