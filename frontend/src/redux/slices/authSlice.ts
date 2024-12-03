import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface userState {
    loading:boolean,
    token:string | null;
    error:string |null;
    userName:string |null;
    email:string | null
}

const initialState : userState={
    loading:false,
    token:null,
    error:null,
    userName:null,
    email:null
}

const userSlice=createSlice ({
    name:"user", 
    initialState,
    reducers:{
        loginRequest:(state)=>{
            state.loading=true;
            state.error=null
        },
        
        loginSuccess: (state, action: PayloadAction<{ token: string; userName: string; email: string }>) => {  
            state.loading = false;
            state.token = action.payload.token;
            state.userName = action.payload.userName;
            state.email = action.payload.email;
          },
        loginFailure:(state,action:PayloadAction<string>)=>{
            state.loading=false,
            state.error=action.payload
        },
        logout:(state)=>{
            state.loading=false,
            state.token=null,
            state.error=null,
            state.userName=null
        },
        setUserName:(state,action: PayloadAction<string>)=>{
            state.userName=action.payload
        },
        resetUser:(state)=>{
            state.loading=false,
            state.token=null,
            state.error=null,
            state.userName=null,
            state.email=null
            
        }
    }
})


export const {loginRequest,loginSuccess,loginFailure,logout,setUserName,resetUser}=userSlice.actions;
export default userSlice.reducer


