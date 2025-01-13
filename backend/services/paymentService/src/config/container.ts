import PaymentController from "../controllers/implementations/paymentController";
import Payment from "../models/paymentModel";
import { DocSlotRepository } from "../repositories/implementation/DocSlotRepository";
import { PaymentRepository } from "../repositories/implementation/PaymentRepository";
import { PaymentService } from "../services/implementation/paymentService";

const docSlotRepository= new DocSlotRepository()
const paymentRepository=new PaymentRepository(Payment)
const paymentService=new PaymentService(paymentRepository,docSlotRepository)
const paymentController= new PaymentController(paymentService)

export {paymentController}