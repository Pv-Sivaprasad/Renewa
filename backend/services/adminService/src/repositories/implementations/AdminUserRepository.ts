import { IAdminUserRepository } from "../interfaces/IAdminUserRepository";
import AdminUserModel, { IAdminUser } from '../../models/userModel'
import { User } from "../../types/User";
import { UserDataDto } from "../../dto/authDto";



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

   

    
    async findUser(id:any) : Promise<IAdminUser | null > {
      console.log('this is the find user ',id);
      
      return await AdminUserModel.findById(id)
        }

      async findUserData(userId:string):Promise<IAdminUser | null > {
        console.log('the id is',userId);
        return await AdminUserModel.findOne({userId})
        
      }  
        
    async findByUserId(userId: string): Promise<IAdminUser | null> {
      console.log('entering the findbyuserUdd',userId);
      
      return await AdminUserModel.findOne({ userId });
  }

 

      async save(userData:User) {
       const updateUserStatus=await AdminUserModel.findOneAndUpdate(
        {userId:userData.userId},
        {$set:{isBlocked:userData.isBlocked}},
        {new:true}
       )
       return updateUserStatus ? (updateUserStatus.toObject() as User) : null;
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


    async updateuser(userId:string,userData:UserDataDto){
      await AdminUserModel.findOneAndUpdate({
        userId
      },
      {$set:userData},{new:true}
    )
    }

}