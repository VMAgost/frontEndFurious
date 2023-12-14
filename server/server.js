import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';

const app = express();
app.use(express.json());
app.use(cors());

import Car from './models/Car.js';
import Driver from './models/Drivers.js'

app.get('/api/drivers', async (req, res) => {
  try {
    const driver = await Driver.find();
    return res.status(200).json(driver)
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal server error')
  }
});

app.get('/api/cars/low', async (req, res) => {
  try {
    const cars = await Car.find({
      top_speed: {
        $lt: 150
      }
    }).populate('driver')
    return res.json(cars)
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' })
  }
});


app.get('/api/cars/mid', async (req, res) => {
  try {
    const cars = await Car.find({
      top_speed: {
        $gte: 150,
        $lt: 200
      }
    })
    return res.json(cars)
  } catch (err) {
    console.log(err);
    res.status(500).json('Internal server error')
  }
});

app.get('/api/cars/super', async (req, res) => {
  try {
    const cars = await Car.find({
      top_speed: {
        $gte: 200
      }
    })
    return res.json(cars)
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' })
  }
});

app.get('/api/cars/:id', async (req, res) => {
  const carId = req.params.id
  try {
    const car = await Car.findById(carId);
    res.status(200).json(car)
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal server error')
  }
});

app.get('/api/cars', async (req, res) => {
  try {
    const cars = await Car.find().sort({wins: 'desc'});
    res.json(cars)
  } catch (err) {
    console.log(err);
  }
});

app.post('/api/cars', async (req, res) => {
  try {
    const car = await Car.create({
      manufacturer: req.body.manufacturer,
      model: req.body.model,
      top_speed: req.body.top_speed,
      acceleration: req.body.acceleration,
      horsepower: req.body.horsepower,
      image: req.body.image
    });

    res.status(200).json(car);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.patch('/api/cars/:id', async (req, res) => {
  const carId = req.params.id;
  try {
    const updatedCar = await Car.findByIdAndUpdate(
      carId,
      {
        $set: {
         ...req.body
        }
      },
      { new: true }
    );
    if (!updatedCar) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.status(200).json({ updatedCar });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/cars/:id', async (req, res) => {
  const carId = req.params.id;
  try {
    const deletedCar = await Car.findByIdAndDelete(carId);

    if (!deletedCar) {
      return res.status(404).json({ error: 'Car not found' })
    }
    res.status(200).json({ deletedCar })
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: 'Server error' })
  }
})


//create .env in server folder + npm i dotenv 
//PORT=4000 MONG_URI=mongodb://127.0.0.1:27017/

mongoose.connect(process.env.MONG_URI)
  .then(() => {
    app.listen(process.env.PORT, () => console.log('http://localhost:4000'))
  });







