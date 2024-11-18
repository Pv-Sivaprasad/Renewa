import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AdminState {
  loading: boolean;
  token: string | null;
  error: string | null;
  isAuthenticated:boolean
  role:string | null
 
}

const initialState: AdminState = {
  loading: false,
  token: null,
  error: null,
  isAuthenticated:false,
  role:null
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    loginSuccess: (state, action: PayloadAction<{ token: string}>) => {
      state.loading = false;
      state.token = action.payload.token;
      state.isAuthenticated=true
      state.role='admin'
      
    },
    
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    logout: (state) => {
      state.loading = false;
      state.token = null;
      state.error = null;
      state.isAuthenticated=false
      state.role=null
      
    },
    resetAdmin: (state) => {
      state.loading = false;
      state.token = null;
      state.error = null;
     state.isAuthenticated=false
     state.role='admin'
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout, resetAdmin } = adminSlice.actions;
export default adminSlice.reducer;




// import { createSlice,PayloadAction } from "@reduxjs/toolkit";
// import { AdminData,AdminState } from "../types";

// const initialState : AdminState ={

//     isLoggedIn:false,
//     adminData:null,
//     token:null

// }


// const adminSlice=createSlice({
//     name:"admin",
//     initialState,
//     reducers: {
//         loginSuccess: (state, action: PayloadAction<{ adminData: AdminData }>) => {
//           state.isLoggedIn = true;
//           state.adminData = action.payload.adminData;
//         },
//         logout: (state) => {
//           state.isLoggedIn = false;
//           state.adminData = null;
//         },
//       },
// })


// export const {loginSuccess,logout}=adminSlice.actions
// export default  adminSlice.reducer;
