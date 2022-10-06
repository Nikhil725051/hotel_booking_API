import express from "express";
const authRouter = express.Router();


authRouter.get('/', (req, res, next) => {
    res.end("Hello")
});


export default authRouter