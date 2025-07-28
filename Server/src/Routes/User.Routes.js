import { Router } from "express";
import upload from "../Middlewares/Multer.Middleware.js";
import { blockUserById, getAllUsers, getUserById, getUserDataBySeekerId, loginUser, registerUser, removeUserById } from "../Controllers/User.Controllers.js";
import multer from "multer";


const UserRouter = Router(); 

UserRouter.post('/register/new', upload.single('picture'), registerUser); 
UserRouter.post('/register/login',loginUser)
UserRouter.get('/list/all',getAllUsers)
UserRouter.get('/list/all/:userId',getUserById)
UserRouter.get('/list/all/seeker/:seekerId',getUserDataBySeekerId)
UserRouter.delete('/list/all/remove/:userId',removeUserById)
UserRouter.put('/list/all/:userId/block',blockUserById)

export default UserRouter; 