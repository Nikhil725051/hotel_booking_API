import Hotel from "../models/hotels.js";



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
    try{
        var hotels = await Hotel.find();
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