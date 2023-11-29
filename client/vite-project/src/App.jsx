
import React from 'react';
import './App.css';
import Race from './components/Race';
import { useState, useEffect } from 'react'
import './App.css'
import Allcars from './components/Allcars';

import OppoentGarage from './components/OpponentGarage';
import { Link } from 'react-router-dom';


function App() {

const [allCars, setAllCars] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/api/cars')
      .then((res) => res.json())
      .then((data) => setAllCars(data))
      .catch((err) => console.error('Error: ', err));
  }, []);


  return (
    <>
      <div>
        {allCars && <Allcars allcars={allCars} />}
        {allCars && <OppoentGarage allCars={allCars} />}



  return (
    <>
      <div>
        <Allcars allcars={allCars} />
        <Link to={'/api/garage'}><button>Garage</button></Link>
      </div>
    </>
  );
}

export default App;
