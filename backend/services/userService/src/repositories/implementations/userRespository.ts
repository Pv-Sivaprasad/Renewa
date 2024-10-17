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


}