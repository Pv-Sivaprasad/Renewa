import express from 'express'
import WebHookController from '../controllers/implementations/webHookController'
import { IWebHookServices } from '../services/interface/IWebHookService'
import { WebHookService } from '../services/implementation/webHookService'
import authenticateToken from '../middleware/authMiddleware'

const webhook_router=express.Router()
const iWebHook=new WebHookService()
const webHookController= new WebHookController()


webhook_router.post('/',webHookController.webHookHandle)
 
export default webhook_router 