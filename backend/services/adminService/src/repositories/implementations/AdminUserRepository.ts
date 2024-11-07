import { IAdminUserRepository } from "../interfaces/IAdminUserRepository";
import AdminUserModel from '../../models/userModel'



export class AdminUserRepository implements IAdminUserRepository {
    
    async saveUser(data: { userId: string; username: string; email: string }): Promise<void> {
        try {
          const newUser=  await AdminUserModel.create(data) 
          await newUser.save()
          console.log('usersaved ',newUser);
          
          } catch (error) {
            console.error('Error saving user to admin database:', error);
            throw new Error('Failed to save user in admin database');
          }
    }

    async updateUserStatus(userId: string, isBlocked: boolean): Promise<void> {
        await AdminUserModel.updateOne({ userId }, { isBlocked });
      }


      async getAllUsers(): Promise<any[]> { 
        console.log('entering the get all users in admin user repository');
        try {
            const users = await AdminUserModel.find(); 
            return users; 
        } catch (error) {
            console.error('Error fetching all users from admin DB:', error);
            throw new Error('Failed to fetch users');
        }
    }


}