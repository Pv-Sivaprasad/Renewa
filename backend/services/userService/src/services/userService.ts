import { UpdateProfileDto } from "../dto/userDto";
import { UserRepository } from "../repositories/implementations/userRespository";


export class UserService {
    
    private userRepository : UserRepository

    constructor(){
        this.userRepository= new UserRepository()
    }


    async getProfileData(id:string){
        return await this.userRepository.findUserById(id)
    }

    async updateUserProfile(userId:string,updateProfileDto:UpdateProfileDto){
        return await this.userRepository.updateProfile(userId,updateProfileDto)
    }

}