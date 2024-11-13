import express from "express";
import { isAuthenticated } from "../middleware/auth.middleware";
// import userController

const user_route=express.Router()

user_route.get('/profile',)
// user_route.post('/edit-profile',isAuthenticated.editProfile)



export default user_route


