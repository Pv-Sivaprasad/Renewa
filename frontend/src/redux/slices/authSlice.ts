import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    loading:boolean,
    token:string | null;
    error:string |null;
}

const initialState : AuthState={
    loading:false,
    token:null,
    error:null
}

const authSlice=createSlice ({
    name:"auth",
    initialState,
    reducers:{
        loginRequest:(state)=>{
            state.loading=true;
            state.error=null
        },
        loginSuccess:(state,action :PayloadAction<string>)=>{
            state.loading=false
            state.token=action.payload
        },
        loginFailure:(state,action:PayloadAction<string>)=>{
            state.loading=false,
            state.error=action.payload
        },
        logout:(state)=>{
            state.loading=false,
            state.token=null,
            state.error=null
        }
    }
})


export const {loginRequest,loginSuccess,loginFailure,logout}=authSlice.actions;
export default authSlice.reducer


