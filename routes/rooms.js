import express from "express";
import {getRooms, getRoom, updateRoom, deleteRoom, addRoom } from '../controllers/room.js';
import {verifyAdmin, verifyUser} from '../utils/verifyToken.js';
const roomRouter = express.Router();


roomRouter.get('/', getRooms);

roomRouter.post('/:hotelId', verifyUser, verifyAdmin,  addRoom);

roomRouter.get('/:id', getRoom);

roomRouter.put('/:id', verifyUser, verifyAdmin, updateRoom);

roomRouter.delete('/:id',verifyUser, verifyAdmin, deleteRoom);


export default roomRouter