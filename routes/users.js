import express from "express";
import {verifyUser, verifyAdmin} from '../utils/verifyToken.js';
import { deleteUser, getUsers, updateUser } from "../controllers/user.js";
const userRouter = express.Router();


userRouter.get('/', verifyUser, verifyAdmin, getUsers);

userRouter.put('/', verifyUser, updateUser);

userRouter.delete('/', verifyUser, deleteUser);



export default userRouter