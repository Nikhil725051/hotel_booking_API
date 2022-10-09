import express from "express";
import {verifyUser, verifyAdmin} from '../utils/verifyToken.js';
import Users from "../models/users.js";
import { deleteUser, getUsers, updateUser } from "../controllers/user.js";
const userRouter = express.Router();


userRouter.get('/:id', verifyUser, verifyAdmin, getUsers);

userRouter.put('/:id', verifyUser, updateUser);

userRouter.delete('/:id', verifyUser, deleteUser);



export default userRouter