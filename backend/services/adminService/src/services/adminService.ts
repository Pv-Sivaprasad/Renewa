import { AdminUserRepository } from "../repositories/implementations/AdminUserRepository";
import { User } from "../types/User";
import { AdminDoctorRepository } from "../repositories/implementations/AdminDoctorRepository";


const adminUserRepository = new AdminUserRepository()
const adminDoctorRepository = new AdminDoctorRepository()

export class AdminService {

     getDocDetails =async(docId:string)=>{
        try {
          return   await adminDoctorRepository.findDoctor(docId)
        } catch (error) {
            console.log('error in getting doc details',error);
            
        }
     }

     updateDocDetails = async(docId:string,userData:{docId:string,docname:string,email:string,speciality:string,isBlocked:boolean})=>{
        await adminDoctorRepository.updateDoctor(docId,userData)
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

     getAllUsers = async () => {
        try {
            console.log('entering the get all users in admin servie');
            
            const users = await adminUserRepository.getAllUsers()
            return users
        } catch (error) {
            console.log('error in getting all users', error);
            
        }
    }

    getAllDoctors=async()=>{
        try {
            console.log('enteing th get all doctor in admin service');
            const doctors=await adminDoctorRepository.getAllDoctors()
            return doctors
            
        } catch (error) {
            
        }
    }



    toggleBlockStatus=async(userid:string)=>{
        console.log('the id is in toggle',userid);
        
        try {
            console.log('entering the toggle status');
            
            const dataaa=await adminUserRepository.findUser(userid)
            console.log(dataaa,'this is the data of the user');
            
            if(dataaa){
                let userId=dataaa.userId
                const userData=await adminUserRepository.findByUserId(userId)
                if (!userData) {
                    console.log(`User with id ${userId} not found.`);
                    return null;
            }

            console.log('the userData is ',userData);
           
            if(userData){
                userData.isBlocked = !userData.isBlocked
              }
              
              console.log('the userdata after',userData);
              const response =await adminUserRepository.save(userData)
              console.log('the updated user is ',response);
              return response
            }
            
        } catch (error) {
            console.log('error in the toggle status in adminService',error);
            
        }
    }
    
    toggleDoctorStatus=async(docid:string)=>{
        console.log('the id in the toggel doctor is ',docid);

        try {
            
            const doc=await adminDoctorRepository.findDoctor(docid)
            console.log('the doc in the adminservice',doc);

            if(doc){
                let doctorId=doc.docId
                const docData=await adminDoctorRepository.findDoctorById(doctorId)
                console.log('the docData is',docData);
                if(!docData){
                    console.log(`Doc with ${doctorId} not found`);
                    return null
                }
                if(docData){
                    docData.isBlocked = !docData.isBlocked
                }
                const response=await adminDoctorRepository.save(docData)
                console.log('the updated doctor is ',response);
                return response
                 
            }
            
        } catch (error) {
            console.log('error in the toggle Doctor status in adminService',error);
        }
        
    }
    

}