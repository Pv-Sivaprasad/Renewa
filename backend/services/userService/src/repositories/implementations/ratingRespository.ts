import Rating, { IRating } from "../../models/reviewModel";
import { IRatingRepository } from "../interface/IRatingRepository";

export  class RatingRepository implements IRatingRepository{
    
    async  createRating(ratingData: Partial<IRating>): Promise<IRating> {
        return await Rating.create(ratingData)
    }
   
    async getDoctorRatings(doctorId: string): Promise<IRating[]> {
        throw new Error("Method not implemented.");
    }
    
    async getUserRatings(userId: string): Promise<IRating[]> {
        throw new Error("Method not implemented.");
    }
   
    async deleteRating(ratingId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    
}