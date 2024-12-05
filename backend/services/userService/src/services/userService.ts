import { SlotDTO } from "../dto/slotDto";
import { UpdateProfileDto } from "../dto/userDto";
import { sendUserData } from "../events/rabbitmq/userPublisher";
import { UserRepository } from "../repositories/implementations/userRespository";
import { UserDocSlotRepository } from "../repositories/implementations/userSlotRepository";

export class UserService {
   
    
    private userRepository : UserRepository
    private userdocRepository: UserDocSlotRepository

    constructor(){
        this.userRepository= new UserRepository()
        this.userdocRepository= new UserDocSlotRepository()
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


    async upsertSlot(slotData:SlotDTO) {
      console.log('reached here in user service for slot');
      return await this.userdocRepository.saveDocSlot(slotData)
    }

}