import { Dispatch } from "redux";
import axios from "axios";



//this is how we define the action types
export const LOGIN_REQUEST="LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";


//this is how we define the types with interfaces
interface LoginRequesAction {
    type: typeof LOGIN_REQUEST
}

interface LoginSuccessAction {
    type : typeof LOGIN_SUCCESS;
    payload:string  //this is for the token
}

interface LoginFailureAction {
    type : typeof LOGIN_FAILURE
    payload:string //this is for the error message
}



//Union types for Actions

export type AuthActionTypes= |LoginFailureAction |LoginRequesAction |LoginSuccessAction


//action creators
export const loginRequest=() : AuthActionTypes => ({
    type :LOGIN_REQUEST
})

export const LoginSuccess=(token:string) : AuthActionTypes =>({
    type :LOGIN_SUCCESS,
    payload:token,
})

export const LoginFailure = (error:string) : AuthActionTypes =>({
    type:LOGIN_FAILURE,
    payload:error,
})

