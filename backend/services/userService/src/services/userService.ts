import { UpdateProfileDto } from "../dto/userDto";
import { sendUserData } from "../events/rabbitmq/userPublisher";
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
      let data=await this.userRepository.updateProfile(userId,updateProfileDto)
      console.log('the data in the userService after updatiojn is ',data);

      
      let sendData={
        username:data?.username,
        email:data?.email,
        userId:data?._id
    }

    await sendUserData(sendData)
      
      return data
    }

}