import { AdminUserRepository } from "../repositories/implementations/AdminUserRepository";


const adminUserRepository=new AdminUserRepository()


export const saveUserInAdminDb=async (userData: { userId: string; username: string; email: string })=>{
    try {
        await adminUserRepository.saveUser(userData)
    } catch (error) {
        console.error('Failed to save user data in admin  DB:', error);
        console.log('error from adminservice');
        
    }
}