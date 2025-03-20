import { BookDataDto } from "../dto/bookDto";
import { IDocBookingRepository } from "../repositories/interfaces/IDocBookRepository";
import { IDoctorBooking } from "../models/bookModel";


export class BookService{

    private doctorBookingRepo:IDocBookingRepository

    constructor(doctorBookingRepo:IDocBookingRepository){
        this.doctorBookingRepo= doctorBookingRepo
    }


    async allAppoinments(docId:string){
        const allBookings=await this.doctorBookingRepo.findDoctorById(docId)
        console.log('all bookings',allBookings);
        
        return  allBookings
    }

    async processBooking(docId:string, userId: string, date: string, startTime: string,userName:string): Promise<IDoctorBooking>{
        const userBooking={userId,date,startTime,userName}
        return this.doctorBookingRepo.addBooking(docId,userBooking)
    }

}