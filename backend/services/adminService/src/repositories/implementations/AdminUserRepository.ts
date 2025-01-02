import { IAdminUserRepository } from "../interfaces/IAdminUserRepository";
import AdminUserModel, { IAdminUser } from '../../models/userModel'
import { User } from "../../types/User";
import { UserDataDto } from "../../dto/authDto";
import { PaginateType } from "../../types/authTypes";



export class AdminUserRepository implements IAdminUserRepository {

  async saveUser(data: { userId: string; username: string; email: string }): Promise<void> {
    try {
      const newUser = await AdminUserModel.create(data)
      await newUser.save()
    } catch (error) {
      console.error('Error saving user to admin database:', error);
      throw new Error('Failed to save user in admin database');
    }
  }

  async findUser(id: any): Promise<IAdminUser | null> {
    return await AdminUserModel.findById(id)
  }

  async findUserData(userId: string): Promise<IAdminUser | null> {
    return await AdminUserModel.findOne({ userId })

  }

  async findByUserId(userId: string): Promise<IAdminUser | null> {
    return await AdminUserModel.findOne({ userId });
  }



  async save(userData: User) {
    const updateUserStatus = await AdminUserModel.findOneAndUpdate(
      { userId: userData.userId },
      { $set: { isBlocked: userData.isBlocked } },
      { new: true }
    )
    return updateUserStatus ? (updateUserStatus.toObject() as User) : null;
  }



  async getAllUsers(page:number,limit:number): Promise<PaginateType> {
    try {

      const skip=(page-1)*limit
 
      // const users = await AdminUserModel.find().skip(skip).limit(limit)
      const [users,total]=await Promise.all([
        AdminUserModel.find().skip(skip).limit(limit),
        AdminUserModel.countDocuments()
      ])
      // console.log('the total is//////////////////////// ',total);
      
      return {
        users,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
    };
    } catch (error) {
      console.error('Error fetching all users from admin DB:', error);
      throw new Error('Failed to fetch users');
    }
  }


  async updateuser(userId: string, userData: UserDataDto) {
    await AdminUserModel.findOneAndUpdate({
      userId
    },
      { $set: userData }, { new: true }
    )
  }

}