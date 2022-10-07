import express from "express";
import Hotel from "../models/hotels.js";
import { createHotel, getHotel, getHotels, updateHotel } from "../controllers/hotel.js";
const hotelRouter = express.Router();


hotelRouter.post('/', createHotel);

hotelRouter.get('/', getHotels);

hotelRouter.get('/:id', getHotel);

hotelRouter.put('/:id', updateHotel);


export default hotelRouter