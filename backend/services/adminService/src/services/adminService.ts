import { AdminUserRepository } from "../repositories/implementations/AdminUserRepository";


const adminUserRepository = new AdminUserRepository()


export class AdminService {

     saveUserInAdminDb = async (userData: { userId: string; username: string; email: string }) => {
        try {
            await adminUserRepository.saveUser(userData)
        } catch (error) {
            console.error('Failed to save user data in admin  DB:', error);
            console.log('error from adminservice');
    
        }
    
    }
    
     getAllUsers = async () => {
        try {
            console.log('entering the get all users in admin servie');
            
            const users = await adminUserRepository.getAllUsers()
            return users
        } catch (error) {
            console.log('error in getting all users', error);
            
        }
    }


}