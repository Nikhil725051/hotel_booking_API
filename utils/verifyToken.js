import jwt from "jsonwebtoken";
import {createError} from './error.js';
import User from '../models/users.js'



const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token){
        throw (createError(401, "You are not authenticated!"));
    }
    jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
        if(err){
            throw (createError(403, "Invalid token!"));
        }else{
            req.user = payload;
        }
    });
}

export const verifyUser = async (req, res, next) => {
  try{
    verifyToken(req, res, next);
    const user = await User.findById(req.user.id);
    if(user!=null){
      return next();
    }
    throw (createError(404, "User not found"));

   }catch (err){
        next(err);
    }

}

export const verifyAdmin = (req, res, next) => {
    if(req.user.isAdmin){
        return next();
    }

    next(createError(401, "You are not authorized to perform this operation"));
}