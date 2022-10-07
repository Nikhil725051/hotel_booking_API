import User from "../models/users.js";
import bcrypt from 'bcrypt';
import { createError } from "../utils/error.js";
import Jwt from "jsonwebtoken";

  

export const registerUser = async(req, res, next) => {
    try{
        const hash = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            ...req.body,
            password: hash 
        })
        const newUser = await user.save();
        res.status(200);
        res.setHeader('Content-Type', 'application/json');
        res.json(newUser);
    }catch(err){
        next(err);
    }
}

export const loginUser = async(req, res, next) => {
    try{
        const user = await User.findOne({userName: req.body.userName})
        if(!user){
           var err = createError(404, "User not found");
           return next(err);
        }else{
            if(bcrypt.compare(req.body.password, user.password))
            {
                const token = Jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_KEY);
                const {password, isAdmin, ...otherDetails} = user.toObject();
                res.status(200).setHeader('Content-Type', 'application/josn');
                res.cookie("access_toke", token, {httpOnly: true}).json(otherDetails);
               }else{
                return next(createError(403, "Incorrect password"));
            }
            
        }
    }catch(err){
        next(err);
    }
}