import { UpdateProfileDto } from '../../dto/userDto'
import UserModel from '../../models/userModel'
import User, {IUser} from '../../models/userModel'
import { BaseRepository } from '../baseRepository'
import { Model } from 'mongoose'



export class UserRepository  extends BaseRepository<IUser> {

    constructor(userModel:Model<IUser>=UserModel){
        super(userModel)
    }


    async createUser(user:IUser) : Promise<IUser>{
        return await User.create(user)
    }



    async findUserByEmail(email:string): Promise<IUser | null >{
        return await User.findOne({email})
    }



    async findUserById(id:string) : Promise <IUser | null >{
        return await User.findById(id)
    }


    
    async verifyUser(email: string, isVerified: boolean): Promise<IUser | null> {
       
        await User.updateOne({ email }, { isVerified });
        return await User.findOne({ email });
    }
    

    async UpdatePassword(email:string,field:string,value:any) :Promise<IUser | null>{
        const update={$set:{[field]:value}}
        return await User.findOneAndUpdate({email},update,{new:true})
    }
    
    async updateUserStatus(userId:string,isBlocked:boolean) : Promise< boolean>{
        try {
            console.log(userId,'userId to find in db');
            console.log(isBlocked,'to change');
            
            const result = await User.findOneAndUpdate(
                { _id:userId },              
                { isBlocked },            
                { new: true }           
            );

            if (result) {
                console.log(`User ${userId} status updated to isBlocked: ${isBlocked}`);
                return true;
            } else {
                console.log(`User with userId ${userId} not found.`);
                return false;
            }
        } catch (error) {
            console.error(`Error in updating user status for ${userId}:`, error);
            throw new Error('Failed to update user status');
        }
    }

    async updateProfile(userId:string,updateProfileDto:UpdateProfileDto) : Promise<IUser | null>{
        return await User.findByIdAndUpdate(
            userId,
            {$set:updateProfileDto},
            {new:true}
        )
    }

}