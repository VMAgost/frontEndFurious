import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';

const app = express();
app.use(express.json());
app.use(cors());

import Car from './models/Car.js';

app.get('/cars', async (req, res) => {
    const cars = await Car.find();
  
    res.json(cars);
  })
app.get('/api/cars', async (req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars)
    } catch (err) {
        console.log(err);
    }
});



//create .env in server folder + npm i dotenv 
//PORT=4000 MONG_URI=mongodb://127.0.0.1:27017/

mongoose.connect(process.env.MONG_URI)
    .then(() => {
        app.listen(process.env.PORT, () => console.log('http://localhost:4000'))
    });






