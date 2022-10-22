import mongoose from "mongoose";



const roomSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    maxPeople: {
        type: Number,
        required: true
    },

    roomNumbers: [{number: Number, unavailableDates: {type: [Date]}}],

    price: {
        type: Number,
        required: true
    },
}, {timestamps: true});

export default mongoose.model("Room", roomSchema);