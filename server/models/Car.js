import mongoose from "mongoose";
const { Schema, model } = mongoose


const CarSchema = new Schema({
    manufacturer: {
        type: String,
        require: true,
    },
    model: {
        type: String,
        require: true,
    },
    top_speed: {
        type: Number,
        require: true,
    },
    acceleration: {
        type: Number,
        require: true
    },
    horsepower: {
        type: Number,
        require: true
    },
}, {timestamps: true});

export default model('Car', CarSchema)