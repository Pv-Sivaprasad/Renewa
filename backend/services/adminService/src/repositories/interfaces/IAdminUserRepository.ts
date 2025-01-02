import AdminUser from '../../models/userModel'
import { PaginateType } from '../../types/authTypes';


export interface IAdminUserRepository {
    saveUser(data:any): Promise<void>
    getAllUsers(page:number,llimit:number): Promise<PaginateType>;
   
    
 
}

