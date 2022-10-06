import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/users.js";
import hotelRouter from "./routes/hotels.js";
import authRouter from "./routes/auth.js";
import roomRouter from "./routes/rooms.js";
const app = express();
dotenv.config()

async function connectToMongoDB(){
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB");
    } catch (error){
        throw error;
    }
}

app.use('/user', userRouter);
app.use('/hotel', hotelRouter);
app.use('/room', roomRouter);
app.use('/auth', authRouter);


app.listen('8800', () => {
    connectToMongoDB();
    console.log("Connected to server");
})