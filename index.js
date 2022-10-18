import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/users.js";
import hotelRouter from "./routes/hotels.js";
import authRouter from "./routes/auth.js";
import roomRouter from "./routes/rooms.js";
import cookieParser from "cookie-parser";

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

app.use(express.json());
app.use(cookieParser());

app.use('/user', userRouter);
app.use('/hotels', hotelRouter);
app.use('/rooms', roomRouter);
app.use('/auth', authRouter);

app.use((err, req, res, next) => {
    const errStatus = err.status || 500;
    const errMess = err.message || "Something went wrong";
    res.status(errStatus).setHeader('Content-Type', 'application/json');
    res.json({
        success: false,
        status: errStatus,
        message: errMess,
        stack: err.stack
    });
})


app.listen('8800', () => {
    connectToMongoDB();
    console.log("Connected to server");
})