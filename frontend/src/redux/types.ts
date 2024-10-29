
export interface LoginCredentials {
    email: string;
    password: string;
    userName:string
  }
  

export interface AdminData {
  email:string,
  password:string
}

export interface AdminState {
  isLoggedIn:boolean
  adminData: AdminData | null
}