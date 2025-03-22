import { IDocBookingRepository } from "../interfaces/IDocBookRepository";
import { IDoctorBooking,IUserBooking,DoctorBookingModel } from "../../models/bookModel";

export class DoctorBookingRepository implements IDocBookingRepository{
    
    // async findDoctorById(docId: string): Promise<IDoctorBooking | null> {
    //     return DoctorBookingModel.findOne({docId})
    // }
    async findDoctorById(docId: string): Promise<IDoctorBooking | null> {
        return DoctorBookingModel.findOne({ docId })
            .select({
                'bookings.userId':1,
                'bookings.userName': 1,
                'bookings.date': 1,
                'bookings.startTime': 1,
                '_id': 0
            });
    }
    async addBooking(docId: string, UserBooking: IUserBooking): Promise<IDoctorBooking> {
        
        let docBooking=await DoctorBookingModel.findOne({docId})

        if(!docBooking){
            docBooking=new DoctorBookingModel({docId,bookings:[UserBooking]})
        }else{
            docBooking.bookings.push(UserBooking)
        }

        await docBooking.save()
        return docBooking.toObject()
    }

}