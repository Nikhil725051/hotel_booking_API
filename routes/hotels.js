import express from "express";
import Hotel from "../models/hotels.js";
import { countByCity, countByType, createHotel, getHotel, getHotels, updateHotel } from "../controllers/hotel.js";
const hotelRouter = express.Router();


hotelRouter.post('/', createHotel);

hotelRouter.get('/', getHotels);

hotelRouter.get('/find/:id', getHotel);

hotelRouter.put('/:id', updateHotel);

hotelRouter.get('/countByCity', countByCity)

hotelRouter.get('/countByType', countByType)


export default hotelRouter