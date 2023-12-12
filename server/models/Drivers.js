import mongoose from "mongoose";
const { Schema, model } = mongoose;

const DriverSchema = new Schema ({
  name: String,
  skill: Number,
  image: String
})

export default model('Driver', DriverSchema)

