import AdminController from "../controllers/adminController";
import { AdminService } from "../services/adminService";
import { AdminUserRepository } from "../repositories/implementations/AdminUserRepository";
import { AdminDoctorRepository } from "../repositories/implementations/AdminDoctorRepository";


const adminUserRepository= new AdminUserRepository()
const adminDoctorRepository= new AdminDoctorRepository()
const adminService= new AdminService(adminUserRepository,adminDoctorRepository)
const adminController=new AdminController(adminService)



export {adminController}
