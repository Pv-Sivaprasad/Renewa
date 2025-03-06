import { IDoctorBooking, IUserBooking } from "../../models/bookModel";



export interface IDocBookingRepository{
    findDoctorById(docId:string):Promise<IDoctorBooking | null>
    addBooking(docId:string,UserBooking:IUserBooking):Promise<IDoctorBooking>
}