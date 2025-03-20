import { Request,Response,NextFunction } from "express";
import { HttpStatus } from "../../enums/HttpStatus";
import { BookService } from "../../services/bookService";
import { JwtPayload } from "jsonwebtoken";
import { DoctorBookingRepository } from "../../repositories/implementations/docBookRepository";
import { CustomeRequest } from "../../middleware/isAuthenticated";



const bookService=new BookService(new DoctorBookingRepository )


export class BookController{


    async appoinments(req:CustomeRequest,res:Response){
        console.log('appoinments in the book contoller');
        
        try {
            const doc=req.user as JwtPayload
                    // console.log(doc,'the doc  from the middleware is');
                    const docId=doc.id
                    console.log(docId,'the doc id from the middleware is');
            
                    const data=await bookService.allAppoinments(docId)
                    console.log('the data recived in controller is ',data);
                    if(data){

                        return res.status(HttpStatus.OK).json(data)
                    }else{
                        return res.status(HttpStatus.NOT_FOUND).json({message:'no data found'})
                    }
                    // console.log('data from the controller is',data);
        } catch (error) {
            console.log('error in the appoinmnet contoller ',error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
            
        }
    }


}