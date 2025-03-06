import { BookDataDto } from "../dto/bookDto";
import { IDocBookingRepository } from "../repositories/interfaces/IDocBookRepository";
import { IDoctorBooking } from "../models/bookModel";


export class BookService{

    private doctorBookingRepo:IDocBookingRepository

    constructor(doctorBookingRepo:IDocBookingRepository){
        this.doctorBookingRepo= doctorBookingRepo
    }


    async processBooking(docId:string, userId: string, userName: string, date: string, startTime: string): Promise<IDoctorBooking>{
        const userBooking={userId,userName,date,startTime}
        return this.doctorBookingRepo.addBooking(docId,userBooking)
    }

}