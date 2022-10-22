import Rooms from "../models/rooms.js";
import Hotel from '../models/hotels.js';
import { createError } from "../utils/error.js";



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
        const updatedHotel = await Hotel.findByIdAndUpdate(
             req.params.hotelId,
             {$push: {rooms: savedRoom._id}});
       if(updatedHotel==null){
        throw createError(404, "Hotel not found!");
       }
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
        const deletedHotel = await Hotel.findByIdAndUpdate(req.params.hotelId, {$pull: {rooms: req.params.id}});
        if(deletedHotel==null){
            throw createError(404, "Hotel not found!")
        }
        await Rooms.findByIdAndDelete(req.params.id);
        res.status(200).setHeader('Content-Type', 'application/json');
        res.json({message: "Room has been deleted"});
    }catch(err){
        next(err);
    }
}

export const updateAvailability = async(req, res, next) => {
    try{
        await Rooms.updateOne(
            {"roomNumbers._id" : req.params.id},
            {$push: {
                "roomNumbers.$.unavailableDates": req.body
            }});
            res.status(200).setHeader('Content-Type', 'application/json');
            res.json("Room status has been updated");
    }catch(err){
        next(err);
    }
}