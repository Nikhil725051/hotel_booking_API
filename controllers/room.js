import Rooms from "../models/rooms.js";
import Hotel from '../models/hotels.js';



export const getRooms = async (req, res, next) => {
    try{
        const rooms = await Rooms.find();
        res.status(200).setHeader('Content-Type', 'application/json');
        res.json(rooms);
    }catch(err){
        next(err);
    }
}

export const getRoom = async (req, res, next) => {
    try{
        const room = await Rooms.findById(req.params.id);
        res.status(200).setHeader('Content-Type', 'application/json');
        res.json(room);
    }catch(err){
        next(err);
    }
}

export const addRoom = async (req, res, next) => {
    const room = new Rooms(req.body);
    try{
        const savedRoom = await room.save();
        await Hotel.findByIdAndUpdate(
             req.params.hotelId,
             {$push: {rooms: savedRoom._id}});
        res.status(200).setHeader('Content-Type', 'application/json');
        res.json(savedRoom);
    }catch(err){
        next(err);
    }
}

export const updateRoom = async (req, res, next) => {
    try{
        const room = await Rooms.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).setHeader('Content-Type', 'application/json');
        res.json(room);
    }catch(err){
        next(err);
    }
}

export const deleteRoom = async (req, res, next) => {
    try{
        await Rooms.findByIdAndDelete(req.params.id);
        res.status(200).setHeader('Content-Type', 'application/json');
        res.json({message: "Room has been deleted"});
    }catch(err){
        next(err);
    }
}