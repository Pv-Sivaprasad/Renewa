import { AdminUserRepository } from "../repositories/implementations/AdminUserRepository";
import { User } from "../types/User";
import { AdminDoctorRepository } from "../repositories/implementations/AdminDoctorRepository";
import { UserDataDto } from "../dto/authDto";
import { AdminDocSlotRepository } from "../repositories/implementations/AdminDocSlotRepository";
import { SlotDTO } from "../dto/slotDto";

const adminUserRepository = new AdminUserRepository()
const adminDoctorRepository = new AdminDoctorRepository()
const adminDocSlotRepository= new AdminDocSlotRepository()


export class AdminService {

private adminUserRepo : AdminUserRepository
private adminDocRepo:AdminDoctorRepository

    constructor(adminUserRepo:AdminUserRepository,adminDocRepo:AdminDoctorRepository){
        this.adminUserRepo= adminUserRepo
        this.adminDocRepo=adminDocRepo
    }

    getAllUsers = async (page:number,limit:number) => { 
        try {
            console.log('entering the get all users in admin servie');
            
            // const users = await adminUserRepository.getAllUsers()
            const users=await this.adminUserRepo.getAllUsers(page,limit)
            console.log('the uiser in servuce',users);
            
            return users
        } catch (error) {
            console.log('error in getting all users', error);
            
        }
    }

    getUserDetails=async(userId:string)=>{
        try {
            // let data= await adminUserRepository.findUserData(userId)
            let data=await this.adminUserRepo.findUserData(userId)    
            return data
            
        } catch (error) {
            console.log('error in getting user details',error);
            
        }
     }


     updateUserDetails=async(userId:string,userData:{userId:string,username:string,email:string})=>{

        try {
            console.log('moww');
            
            // let updatedData=await adminUserRepository.updateuser(userId,userData)
            let updatedData=await this.adminUserRepo.updateuser(userId,userData)
        } catch (error) {
            console.log('failed to update the data');
            
        }
     }

     toggleBlockStatus=async(userid:string)=>{
        console.log('the id is in toggle',userid);
        
        try {
            console.log('entering the toggle status');
            
            // const dataaa=await adminUserRepository.findUser(userid)
            const dataaa=await this.adminUserRepo.findUser(userid)
            console.log(dataaa,'this is the data of the user');
            
            if(dataaa){
                let userId=dataaa.userId
                // const userData=await adminUserRepository.findByUserId(userId)
                const userData=await this.adminUserRepo.findByUserId(userId)
                if (!userData) {
                    console.log(`User with id ${userId} not found.`);
                    return null;
            }

            console.log('the userData is ',userData);
           
            if(userData){
                userData.isBlocked = !userData.isBlocked
              }
              
              console.log('the userdata after',userData);
            //   const response =await adminUserRepository.save(userData)
              const response =await this.adminUserRepo.save(userData)
              console.log('the updated user is ',response);
              return response
            }
            
        } catch (error) {
            console.log('error in the toggle status in adminService',error);
            
        }
    }
    



    /**
     * this is for getting all the doctors list 
     *
     * @memberof AdminService
     */
    getAllDoctors=async(page:number,limit:number)=>{
        try {
            console.log('enteing th get all doctor in admin service');
            // const doctors=await adminDoctorRepository.getAllDoctors()
            const doctors=await this.adminDocRepo.getAllDoctors(page,limit)
            return doctors
            
        } catch (error) {
            
        }
    }

    /**
     * this is to get a particulat doc list
     *
     * @param {string} docId
     * @memberof AdminService
     */
    getDocDetails =async(docId:string)=>{
        try {
          
            
        //   return   await adminDoctorRepository.findDoctorById(docId)
        return await this.adminDocRepo.findDoctorById(docId)
        } catch (error) {
            console.log('error in getting doc details',error);
            
        }
     }

    
     updateDocDetails = async(docId:string,userData:{docId:string,docname:string,email:string,speciality:string,isBlocked:boolean})=>{
        await adminDoctorRepository.updateDoctor(docId,userData)
     }

     toggleDoctorStatus=async(docid:string)=>{
        console.log('the id in the toggel doctor is ',docid);

        try {
            
            // const doc=await adminDoctorRepository.findDoctor(docid)
            const doc= await this.adminDocRepo.findDoctor(docid)
            console.log('the doc in the adminservice',doc);

            if(doc){
                let doctorId=doc.docId
                // const docData=await adminDoctorRepository.findDoctorById(doctorId)
                const docData=await this.adminDocRepo.findDoctorById(doctorId)
                console.log('the docData is',docData);
                if(!docData){
                    console.log(`Doc with ${doctorId} not found`);
                    return null
                }
                
                if(docData){
                    docData.isBlocked = !docData.isBlocked
                }
                // const response=await adminDoctorRepository.save(docData)
                const response=await this.adminDocRepo.save(docData)
                console.log('the updated doctor is ',response);
                return response
                 
            }
            
        } catch (error) {
            console.log('error in the toggle Doctor status in adminService',error);
        }
        
    }
    

     saveUserInAdminDb = async (userData: { userId: string; username: string; email: string }) => {
        try {
            await adminUserRepository.saveUser(userData)
        } catch (error) {
            console.error('Failed to save user data in admin  DB:', error);
            console.log('error from adminservice');
    
        }
    
    }
    
    saveDoctorInAdminDb=async(userData:{docId:string;docname:string;email:string,speciality:string})=>{
        try {
            await adminDoctorRepository.saveDoctor(userData)
        } catch (error) {
            console.error('Failed to save doctor data in admin  DB:', error);
            console.log('error from adminservice');
        }
    }




 
 
    upsertSlot=async(slotData:SlotDTO)=>{
        console.log('reached the upsertSlot in the adminService');

        await adminDocSlotRepository.saveDocSlot(slotData)
        
    }

}