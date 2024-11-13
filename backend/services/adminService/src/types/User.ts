
export interface User {
    userId: string;
    username: string;
    email: string;
    isBlocked: boolean;
  }
  
export interface Doctor {
  docId:string;
  docname:string;
  email:string;
  speciality:string
  isBlocked:boolean
}