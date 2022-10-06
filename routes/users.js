import express from "express";
const userRouter = express.Router();


userRouter.get('/', (req, res, next) => {
    res.end("Hello")
});


export default userRouter