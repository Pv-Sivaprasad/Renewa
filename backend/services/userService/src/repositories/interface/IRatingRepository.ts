import { IRating } from "../../models/reviewModel";

export interface IRatingRepository{
    createRating(ratingData: Partial<IRating>): Promise<IRating>;
    getDoctorRatings(doctorId: string): Promise<IRating[]>;
    getUserRatings(userId: string): Promise<IRating[]>;
    deleteRating(ratingId: string): Promise<void>;
}