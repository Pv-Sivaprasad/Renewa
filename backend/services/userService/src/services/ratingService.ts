import { AddRating } from "../dto/ratingDto";
import { IRating } from "../models/reviewModel";
import { RatingRepository } from "../repositories/implementations/ratingRespository";




export class RatingService{
    
private ratingRepository:RatingRepository

constructor(){
    this.ratingRepository= new RatingRepository()
}

    async addRating(data:AddRating): Promise<IRating>{
        const rating=data.rating;
        if (rating < 1 || rating > 5) throw new Error("Rating must be between 1 and 5");
        return await this.ratingRepository.createRating(data)


    }

    async  getDocReviews(docName:string):Promise<IRating[]> {
        return await this.ratingRepository.getDoctorRatings(docName)
    }
}