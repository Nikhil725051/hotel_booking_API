import express from "express";
const roomRouter = express.Router();


roomRouter.get('/', (req, res, next) => {
    res.end("Hello")
});


export default roomRouter