import express from "express";
const hotelRouter = express.Router();


hotelRouter.get('/', (req, res, next) => {
    res.end("Hello")
});


export default hotelRouter