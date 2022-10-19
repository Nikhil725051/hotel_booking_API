import Hotel from "../models/hotels.js";
import Rooms from "../models/rooms.js"



export const createHotel =  async (req, res, next) => {
    var hotel = new Hotel(req.body);
    try{
        const savedHotel = await hotel.save();
        res.status(200)
           .setHeader('Content-Type', 'application/json')
           .json(savedHotel);
    }catch(err){
        res.status(500).json(err);
        
    }
}

export const getHotels = async(req, res, next) => {
    const {min, max, ...others} = req.query;
    try{
        var hotels = await Hotel.find(
            {...others,
            cheapestPrice: {$gt:min || 1, $lt: max || 10000}}
        ).limit(req.query.limit);
        res.status(200)
           .setHeader('Content-Type', 'applictaion/json')
           .json(hotels)
    }catch(err){
        next(err);
    }
}

export const getHotel = async(req, res, next) => {
    try{
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).setHeader('Content-Type', 'application/json');
        res.json(hotel)
    }catch(err){
        next(err);
    }
}

export const updateHotel = async(req, res, next) => {
    try{
        const hotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true});
        res.status(200).setHeader('Content-Type', 'application/json');
        res.json(hotel);
    }catch(err){
        next(err)
    }
}


export const countByCity = async(req, res, next) => {

    const cities = req.query.cities.split(',');
    try{
        const count = await Promise.all(cities.map( async (city) => {
           return await Hotel.countDocuments({city: city})
        }));
        res.status(200).setHeader('Content-Type', 'application/json');
        res.json(count);
    }catch(err){
        next(err);
    }
}

export const countByType = async(req, res, next) => {
    try{
        const hotelCount = await Hotel.countDocuments({type: 'Hotel'});
        const apartmentCount = await Hotel.countDocuments({type: 'Apartment'});
        const villaCount = await Hotel.countDocuments({type: 'Villa'});
        const resortCount = await Hotel.countDocuments({type: 'Resort'});
        res.status(200).setHeader('Content-Type', 'application/json');
        res.json([
            {type: "Hotel", count: hotelCount},
            {type: "Apartment", count: apartmentCount},
            {type: "Villa", count: villaCount},
            {type: "Resort", count: resortCount},
          ]);
    }catch(err){
        next(err);
    }
}

export const getHotelRooms = async(req, res, next) => {
    try{
        const hotel = await Hotel.findById(req.params.id);
        const hotelRooms = await Promise.all(hotel.rooms.map(async (roomId) => {
            return await Rooms.findById(roomId);
        }));
        res.status(200).setHeader('Content-Type', 'application/json');
        res.json(hotelRooms);
    }catch(err){
        next(err);
    }
}