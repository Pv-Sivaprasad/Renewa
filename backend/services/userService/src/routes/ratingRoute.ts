import express from 'express'
import { authenticateToken } from '../middleware/auth.middleware'
import { RatingController } from '../controllers/ratingController'
import { checkUserStatus } from '../middleware/checkUser.middleware'



const rating_route=express.Router()
const ratingController=new RatingController()


console.log('reached');


rating_route.post('/addrating',authenticateToken,checkUserStatus,ratingController.addRating)
rating_route.get('/doc/:docName',ratingController.getDocRating)


export default rating_route