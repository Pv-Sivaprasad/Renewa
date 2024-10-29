import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { AdminData,AdminState } from "../types";

const initialState : AdminState ={

    isLoggedIn:false,
    adminData:null

}


const adminSlice=createSlice({
    name:"admin",
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<{ adminData: AdminData }>) => {
          state.isLoggedIn = true;
          state.adminData = action.payload.adminData;
        },
        logout: (state) => {
          state.isLoggedIn = false;
          state.adminData = null;
        },
      },
})


export const {loginSuccess,logout}=adminSlice.actions
export default  adminSlice.reducer;
