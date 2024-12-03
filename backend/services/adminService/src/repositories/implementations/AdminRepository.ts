import adminModel from "../../models/adminModel";

export class AdminRespository{
    async findByEmail(email:string){
        return adminModel.findOne({email})
    }
}

