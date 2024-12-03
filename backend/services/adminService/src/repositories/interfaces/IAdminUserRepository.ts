import AdminUser from '../../models/userModel'


export interface IAdminUserRepository {
    saveUser(data:any): Promise<void>
    getAllUsers(): Promise<any[]>;
   
    
 
}

