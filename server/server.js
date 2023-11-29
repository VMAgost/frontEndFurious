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

mongoose.connect(process.env.MONG_URI)                                                    
.then(() => {
    app.listen(process.env.PORT, () => console.log('http://localhost:4000'))
});






