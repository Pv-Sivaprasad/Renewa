import PaymentController from "../controllers/paymentController";
import Payment from "../models/paymentModel";
import { PaymentRepository } from "../repositories/implementation/PaymentRepository";
import { PaymentService } from "../services/implementation/paymentService";


const paymentRepository=new PaymentRepository(Payment)
const paymentService=new PaymentService(paymentRepository)
const paymentController= new PaymentController(paymentService)

export {paymentController}