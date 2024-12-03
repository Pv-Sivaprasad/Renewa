
export interface LoginCredentials {
    email: string;
    password: string;
    userName:string
  }
  

  interface AdminState {
    loading: boolean;
    token: string | null;
    error: string | null;
    userName: string | null;
    email: string | null;
  }
  
  const initialState: AdminState = {
    loading: false,
    token: null,
    error: null,
    userName: null,
    email: null,
  };