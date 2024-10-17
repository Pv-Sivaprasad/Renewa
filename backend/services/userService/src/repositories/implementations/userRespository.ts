import User, {IUser} from '../../models/userModel'

export class UserRepository{

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