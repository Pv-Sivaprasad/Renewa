import { Request,Response } from "express";
import { IncomingReques } from "../middleware/auth.middleware";
import { JwtPayload } from "jsonwebtoken";
import { RatingService } from "../services/ratingService";
import { HttpStatus } from "../enums/http.status";

const ratingService= new RatingService()

export class  RatingController {


    async addRating(req:IncomingReques,res:Response){
        // console.log('entering the rating controller in the user');
           const user = req.user as JwtPayload
                    const userId = user.id

        try {
            const {userName,docName,rating,review}=req.body
            // console.log('the body data is ',docName,rating,review);
            
          

            const data={userName,userId,docName,rating,review}

            const newRating=await ratingService.addRating(data)
            // console.log('data recived',newRating)
            return res.status(HttpStatus.CREATED).json(newRating)

        } catch (error) {
            console.log('error in the rating service',error)
            
        }
    }


    async getDocRating(req:IncomingReques,res:Response){

        try {
            const {docName}=req.params
            // console.log('the doc id',docName);
            
            const ratings=await ratingService.getDocReviews(docName)
            return res.status(HttpStatus.CREATED).json(ratings)
        } catch (error) {
            console.log('error in getting single doc reviews',error);
            
        }
    }

 


}