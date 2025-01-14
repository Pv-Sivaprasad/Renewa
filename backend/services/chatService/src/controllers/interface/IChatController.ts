import { Request,Response } from "express";

export interface IChatController{
    intiateChat(req:Request,res:Response):Promise<void>
    sendMessage(req:Request,res:Response):Promise<void>
    getChat(req:Request,res:Response):Promise<void>

}