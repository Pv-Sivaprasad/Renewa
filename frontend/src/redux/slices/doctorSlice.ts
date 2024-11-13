import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface doctorState{
    loading:boolean,
    token:String | null,
    error:String | null,
    userName:String | null,
    email:String | null,
}


const initialState : doctorState={
    loading:false,
    token:null,
    error:null,
    userName:null,
    email:null
}


const doctorSlice=createSlice({
    name:"doctor",
    initialState,
    reducers:{
        loginSuccess: (state, action: PayloadAction<{ token: string; userName: string; email: string }>) => {  
            state.loading = false;
            state.token = action.payload.token;
            state.userName = action.payload.userName;
            state.email = action.payload.email;
          },
          logout:(state)=>{
            state.loading=false,
            state.token=null,
            state.error=null,
            state.userName=null
        },
        setDocName:(state,action: PayloadAction<string>)=>{
            state.userName=action.payload
        },
        resetDoc:(state)=>{
            state.loading=false,
            state.token=null,
            state.error=null,
            state.userName=null,
            state.email=null
            
        }
    }
})


export const {loginSuccess,resetDoc,logout,setDocName}=doctorSlice.actions
export default doctorSlice.reducer

