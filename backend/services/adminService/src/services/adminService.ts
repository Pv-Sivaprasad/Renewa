import { AdminUserRepository } from "../repositories/implementations/AdminUserRepository";
import { User } from "../types/User";

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

    toggleBlockStatus=async(userid:string)=>{
        console.log('the id is in toggle',userid);
        
        try {
            console.log('entering the toggle status');
            
            const dataaa=await adminUserRepository.findUser(userid)
            console.log(dataaa,'this is the data of the user');
            
            if(dataaa){
                let userId=dataaa.userId
                const userData=await adminUserRepository.findByUserId(userId)
                if (!userData) {
                    console.log(`User with id ${userId} not found.`);
                    return null;
            }

            console.log('the userData is ',userData);
           
            if(userData){
                userData.isBlocked = !userData.isBlocked
              }
              console.log('the userdata after',userData);
              const response =await adminUserRepository.save(userData)
              console.log('the updated user is ',response);
              return response
            }
            
        } catch (error) {
            console.log('error in the toggle status in adminService',error);
            
        }
    }
    
    

}