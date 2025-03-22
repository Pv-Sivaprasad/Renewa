import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface doctorState{
    loading:boolean,
    token:String | null,
    error:String | null,
    userName:string | null,
    email:String | null,
    isAuthenticated:boolean
    role:string | null,
    setDoctor:string | null,
    doctorId:string| null
}


const initialState : doctorState={
    loading:false,
    token:null,
    error:null,
    userName:null,
    email:null,
    isAuthenticated:false,
    role:null,
    setDoctor: null,
    doctorId:null
}


const doctorSlice=createSlice({
    name:"doctor",
    initialState,
    reducers:{
        loginSuccess: (state, action: PayloadAction<{ token: string; userName: string; email: string,doctorId:string }>) => {  
            state.loading = false;
            state.token = action.payload.token;
            state.userName = action.payload.userName;
            state.email = action.payload.email;
            state.isAuthenticated=true;
            state.doctorId=action.payload.doctorId;
            state.role='doctor'
          },
          logout:(state)=>{
            state.loading=false,
            state.token=null,
            state.error=null,
            state.userName=null,
            state.isAuthenticated=false
            state.role=null
        },
        setDocName:(state,action: PayloadAction<string>)=>{
            state.userName=action.payload
        },
        resetDoc:(state)=>{
            state.loading=false,
            state.token=null,
            state.error=null,
            state.userName=null,
            state.email=null,
            state.isAuthenticated=false,
            state.role=null,
            state.doctorId=null
            
        },
        setDoctor:(state,action: PayloadAction<string>)=>{
            state.userName=action.payload
        }
        
    }
})


export const {loginSuccess,resetDoc,logout,setDocName,setDoctor}=doctorSlice.actions
export default doctorSlice.reducer

