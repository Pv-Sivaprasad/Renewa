import Rating, { IRating } from "../../models/reviewModel";
import { IRatingRepository } from "../interface/IRatingRepository";

export  class RatingRepository implements IRatingRepository{
    
    async  createRating(ratingData: Partial<IRating>): Promise<IRating> {
        return await Rating.create(ratingData)
    }
   
    async getDoctorRatings(docName: string): Promise<IRating[]> {
        let data=await Rating.find({docName}).select("userName rating review");
        // console.log('data',data);
        return data
        
    }
    
    async getUserRatings(userId: string): Promise<IRating[]> {
        throw new Error("Method not implemented.");
    }
   
    async deleteRating(ratingId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    
}