import { UserRepository } from "../repositories/implementations/userRespository";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { IUser } from "../models/userModel";
import { RegisterDto } from "../dto/authDto";


export class AuthService {

    private userRespository : UserRepository;

    constructor(){
        this.userRespository =new UserRepository()
    }


    async registerUser(registerData:RegisterDto) : Promise<IUser> {
        const {username,email,password}=registerData

        const exsistingUser=await this.userRespository.findUserByEmail(email)

        if(exsistingUser) throw new Error('User already exists')

            const hashedPassword=await bcrypt.hash(password,10)
            const newUser=await this.userRespository.createUser({
                username,
                email,
                password:hashedPassword
            }as IUser)

            return newUser

    }

}